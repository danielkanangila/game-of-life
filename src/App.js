import React, { useState, useEffect } from "react";
import styled from "styled-components";
import produce from "immer";

const numRows = 50;
const numCols = 50;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });
  const [running, setRunning] = useState(false);
  const [simulatorTimer, setSimulatorTimer] = useState(null);

  const updateCellulars = (rowIndex, colIndex, currentStatus) => {
    const newState = produce(grid, (gridCopy) => {
      gridCopy[rowIndex][colIndex] = currentStatus ? 0 : 1;
    });
    setGrid(newState);
  };

  const runSimulation = () => {
    console.log("it work");
    const timer = setTimeout(runSimulation, 500);
    setSimulatorTimer(timer);
  };

  useEffect(() => {
    if (running) runSimulation();
    else return clearTimeout(simulatorTimer);
    return () => clearTimeout(simulatorTimer);
  }, [running]);

  return (
    <Wrapper className="App" numCols={numCols}>
      <div className="btn-group">
        <button onClick={() => setRunning(!running)} className="btn">
          {running ? "Stop" : "Start"}
        </button>
        <button className="btn">Reset</button>
      </div>
      <div className="container-grid">
        {grid.map((rows, rowIdx) =>
          rows.map((col, colIdx) => (
            <GridItem
              key={`${rowIdx}-${colIdx}`}
              status={col}
              onClick={() => updateCellulars(rowIdx, colIdx, col)}
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
    ${({ numCols }) => ` grid-template-columns: repeat(${numCols}, 20px)`};
    border: 1px solid #f1f1f1;
    margin-top: 15px;
  }
  .grid-item {
    width: 20px;
    height: 20px;
    border-bottom: 1px solid #f1f1f1;
    border-right: 1px solid #f1f1f1;
    transition: all 0.3s;
  }
  .bg-alive {
    background-color: black;
    border: 1px solid black;
  }
  .bg-dead {
    background-color: white;
    border: inherit;
  }
  .btn {
    padding: 10px 25px;
    border: 2px solid #ccc;
    text-transform: uppercase;
    font-size: 0.7rem;
    font-weight: bold;
    border-radius: 5px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
    }
  }
  .btn-group {
    .btn {
      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right: none;
      }
      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
`;

export default App;
