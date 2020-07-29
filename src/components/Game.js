import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import produce from "immer";

import Control from "./Control";
import Cells from "./cells/Cells";
import { create2DArray, newGenerations } from "../utils";
import { useSettings, useInterval } from "../hooks";
import Display from "./Display";

const Game = () => {
  const [settings, setSettings] = useSettings();
  const [initialCells, setInitialCells] = useState(
    create2DArray(settings.numOfRows, settings.numOfCols)
  );
  const [cells, setCells] = useState(initialCells);
  const [timerId, settimerId] = useState(null);
  const [generations, setGenerations] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setGenerations(generations + 1);
      }, speed);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running, generations]);

  const handleCellClick = (rowIndex, colIndex, val) => {
    if (running) return;
    const initialGen = produce(cells, (cellsCopy) => {
      cellsCopy[rowIndex][colIndex] = val ? 0 : 1;
    });
    setCells(initialGen);
  };

  const runSimulation = () => {
    setCells((c) => {
      return produce(c, (cellsCopy) => {
        c.map((rows, rowIndex) => {
          rows.map((col, colIndex) => {
            cellsCopy = newGenerations(
              c,
              cellsCopy,
              rowIndex,
              colIndex,
              settings.numOfRows,
              settings.numOfCols
            );
          });
        });
      });
    });
  };

  const onPlay = useCallback(() => {
    if (!!running) return clearTimeout(timerId);
    runSimulation();
    settimerId(setTimeout(onPlay, speed));
  });

  const onStop = () => {
    setRunning(false);
    setGenerations(0);
    setCells(initialCells);
    clearInterval(timerId);
  };

  const seed = () => {
    if (running) return;
    setCells((c) => {
      return produce(c, (cellsCopy) => {
        c.map((rows, rowIndex) => {
          rows.map((col, colIndex) => {
            cellsCopy[rowIndex][colIndex] = Math.round(Math.random());
          });
        });
      });
    });
  };

  return (
    <Wrapper>
      <Control
        onPlay={onPlay}
        onStop={onStop}
        onSeed={seed}
        running={running}
        setRunning={setRunning}
      />
      <Cells cells={cells} handleCellClick={handleCellClick} />
      <Display generations={generations} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Game;
