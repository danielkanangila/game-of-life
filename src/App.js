import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import produce from "immer";

import Header from "./components/Header";
import { create2DArray, newGenerations } from "./utils";
import Cells from "./components/cells/Cells";

function App() {
  // States
  const [numOfRows, setNumOfRows] = useState(25);
  const [numOfCols, setNumOfCols] = useState(25);
  const [cellSize, setCellSIze] = useState(20);
  const [grid, setGrid] = useState(create2DArray(numOfRows, numOfCols));
  const [running, setRunning] = useState(false);
  const [simulatorTimer, setSimulatorTimer] = useState(null);
  const [generations, setGenerations] = useState(0);

  const runningRef = useRef(running);
  runningRef.current = running;

  // Handler functions
  const handleCellClick = (rowIndex, colIndex, currentStatus) => {
    // Do nothing when stimulation is running
    if (running) return;

    const newState = produce(grid, (gridCopy) => {
      gridCopy[rowIndex][colIndex] = currentStatus ? 0 : 1;
    });
    setGrid(newState);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((cells) => {
      return produce(cells, (cellsCopy) => {
        cells.map((rows, rowIndex) => {
          rows.map((col, colIndex) => {
            cellsCopy = newGenerations(
              cells,
              cellsCopy,
              rowIndex,
              colIndex,
              numOfRows,
              numOfCols
            );
          });
        });
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  const reset = () => {
    setRunning(false);
    setGenerations(0);
    setGrid(create2DArray(numOfRows, numOfCols));
  };

  const onRunning = () => {
    if (!running) setGenerations(0);
    setRunning(!running);
    runningRef.current = true;
    runSimulation();
  };

  return (
    <Wrapper className="App" numCols={numOfCols} cellSize={cellSize}>
      <Header
        onRunning={onRunning}
        onReset={reset}
        gameState={running}
        generations={generations}
      />
      <Cells />
      {/* <div className="container-grid">
        {grid &&
          grid.map((rows, rowIdx) =>
            rows.map((col, colIdx) => (
              <GridItem
                key={`${rowIdx}-${colIdx}`}
                status={col}
                onClick={() => handleCellClick(rowIdx, colIdx, col)}
              />
            ))
          )}
      </div> */}
    </Wrapper>
  );
}

const GridItem = ({ status, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={status ? "grid-item bg-alive" : "grid-item bg-dead"}
    ></div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 2rem;
  .container-grid {
    display: grid;
    grid-gap: 0;
    ${({ numCols, cellSize }) =>
      ` grid-template-columns: repeat(${numCols}, ${cellSize}px)`};
    border: 1px solid #f1f1f1;
    margin-top: 15px;
  }
  .grid-item {
    ${({ cellSize }) => `width: ${cellSize}px; height: ${cellSize}px;`};
    border-bottom: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
  }
  .bg-alive {
    background-color: black;
    border: 1px solid black;
  }
  .bg-dead {
    background-color: white;
    border: inherit;
  }
`;

export default App;
