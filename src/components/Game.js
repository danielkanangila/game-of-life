import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import produce from "immer";

import Control from "./Control";
import Cells from "./cells/Cells";
import { create2DArray, newGenerations } from "../utils";
import { useSettings } from "../hooks";
import Display from "./Display";

const Game = () => {
  const { settings, setSettings } = useSettings();
  const [initialCells, setInitialCells] = useState(
    create2DArray(settings.numOfRows, settings.numOfCols)
  );
  const [cells, setCells] = useState(initialCells);
  const [timerId, settimerId] = useState(null);
  const [generations, setGenerations] = useState(0);
  const [speed, setSpeed] = useState(160);

  useEffect(() => {
    let interval = null;
    if (settings.running) {
      interval = setInterval(() => {
        setGenerations(generations + 1);
      }, speed);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [settings.running, generations]);

  const handleCellClick = (rowIndex, colIndex, val) => {
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
    if (!!settings.running) return clearTimeout(timerId);
    runSimulation();
    settimerId(setTimeout(onPlay, speed));
  });

  const onStop = () => {
    setSettings({
      ...settings,
      running: false,
    });
    setGenerations(0);
    setCells(initialCells);
    clearInterval(timerId);
  };

  const seed = () => {
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
      <Control onPlay={onPlay} onStop={onStop} onSeed={seed} />
      <Cells cells={cells} handleCellClick={handleCellClick} />
      <Display generations={generations} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Game;
