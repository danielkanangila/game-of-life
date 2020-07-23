import React, { useState } from "react";
import styled from "styled-components";
import produce from "immer";

import Cell from "./Cell";
import { create2DArray } from "./../../utils";

const Cells = () => {
  const [settings, setSettings] = useState({
    numOfRows: 25,
    numOfCols: 25,
    cellSize: 20,
    borderSize: 1,
    borderColor: "#f1f1f1",
    backgroundColor: "#fff",
    aliveCellColor: "#000",
    deadCellColor: "#fff",
    running: false,
    generations: 0,
  });
  const [cells, setCells] = useState(
    create2DArray(settings.numOfRows, settings.numOfCols)
  );

  const handleCellClick = (rowIndex, colIndex, currentCellStatus) => {
    if (settings.running) return;

    const newState = produce(cells, (cellsCopy) => {
      cellsCopy[rowIndex][colIndex] = currentCellStatus ? 0 : 1;
    });
    setCells(newState);
  };

  return (
    <Wrapper
      numOfCols={settings.numOfCols}
      cellSize={settings.cellSize}
      className="container-cell"
      borderColor={settings.borderColor}
    >
      {cells &&
        cells.map((rows, rowIndex) =>
          rows.map((col, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              size={settings.cellSize}
              status={col}
              updateStatus={() => handleCellClick(rowIndex, colIndex, col)}
              borderSize={settings.borderSize}
              borderColor={settings.borderColor}
            />
          ))
        )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-gap: 0;
  ${({ numOfCols, cellSize, borderColor }) =>
    ` 
        grid-template-columns: repeat(${numOfCols}, ${cellSize}px); 
        border: 1px solid ${borderColor};
    `};
  margin-top: 15px;
`;

export default Cells;
