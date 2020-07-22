import React, { useState, useEffect } from "react";
import styled from "styled-components";
import produce from "immer";

import Header from "./components/Header";
import { create2DArray } from "./utils";
import { runGame } from "./game";

function App() {
  // States
  const [numOfRows, setNumOfRows] = useState(100);
  const [numOfCols, setNumOfCols] = useState(150);
  const [grid, setGrid] = useState(create2DArray(numOfRows, numOfCols));
  const [running, setRunning] = useState(false);
  const [simulatorTimer, setSimulatorTimer] = useState(null);
  const [generations, setGenerations] = useState(0);

  useEffect(() => {
    if (running) {
      runSimulation();
      // Set generation
      setGenerations(generations + 1);
    } else return clearTimeout(simulatorTimer);
    return () => clearTimeout(simulatorTimer);
  }, [running, grid]);

  // Handler functions
  const handleCellClick = (rowIndex, colIndex, currentStatus) => {
    // Do nothing when stimulation is running
    if (running) return;

    const newState = produce(grid, (gridCopy) => {
      gridCopy[rowIndex][colIndex] = currentStatus ? 0 : 1;
    });
    setGrid(newState);
  };

  const runSimulation = () => {
    // setGrid(grid => {
    //   return produce(g, gridCopy => {
    //     for (let i=0; i < numRows; i++) {
    //       for (let j=0; j < numRows; j++) {
    //         let neig
    //       }
    //     }
    //   })
    // })
    let newGrid = runGame(grid, numOfRows, numOfCols);
    setGrid(newGrid);

    const timer = setTimeout(runSimulation, 160);
    setSimulatorTimer(timer);
  };

  const reset = () => {
    setRunning(false);
    setGenerations(0);
    setGrid(create2DArray(numOfRows, numOfCols));
  };

  const onRunning = () => {
    if (!running) setGenerations(0);
    setRunning(!running);
  };

  return (
    <Wrapper className="App" numCols={numOfCols}>
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
    ${({ numCols }) => ` grid-template-columns: repeat(${numCols}, 10px)`};
    border: 1px solid #f1f1f1;
    margin-top: 15px;
  }
  .grid-item {
    width: 10px;
    height: 10px;
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
