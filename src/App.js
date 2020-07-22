import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import produce from "immer";

import Header from "./components/Header";
import { create2DArray } from "./utils";
import { runGame } from "./game";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function App() {
  // States
  const [numOfRows, setNumOfRows] = useState(50);
  const [numOfCols, setNumOfCols] = useState(50);
  const [cellSize, setCellSIze] = useState(10);
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

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        g.map((rows, i) => {
          rows.map((col, k) => {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < numOfRows &&
                newK >= 0 &&
                newK < numOfCols
              ) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
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

      <div className="container-grid">
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
      </div>
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
