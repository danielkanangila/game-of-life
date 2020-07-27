import React, { useState, useCallback } from "react";
import styled from "styled-components";
import produce from "immer";

import Control from "./Control";
import Cells from "./cells/Cells";
import { create2DArray, newGenerations } from "../utils";
import { useSettings } from "../hooks";

const Game = () => {
  const { settings, setSettings } = useSettings();
  const [initialCells, setInitialCells] = useState(
    create2DArray(settings.numOfRows, settings.numOfCols)
  );
  const [cells, setCells] = useState(initialCells);
  const [runningTimer, setRunningTimer] = useState(null);
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

  const onPlay = async () => {
    if (!!settings.running) return clearTimeout(runningTimer);
    runSimulation();
    setRunningTimer(setTimeout(onPlay, 100));
  };

  const onStop = () => {
    setSettings({
      ...settings,
      running: false,
    });
    setCells(initialCells);
    clearInterval(runningTimer);
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
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Game;
