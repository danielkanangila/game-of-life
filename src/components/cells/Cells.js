import React, { useState, useEffect } from "react";
import styled from "styled-components";
import produce from "immer";

import Cell from "./Cell";
import { create2DArray } from "./../../utils";
import { useSettings } from "../../hooks/useSettings";

const Cells = () => {
  const settings = useSettings();
  const [cells, setCells] = useState(
    create2DArray(settings.settings.numOfRows, settings.settings.numOfCols)
  );

  const handleCellClick = (rowIndex, colIndex, currentCellStatus) => {
    if (settings.running) return;

    const newState = produce(cells, (cellsCopy) => {
      cellsCopy[rowIndex][colIndex] = currentCellStatus ? 0 : 1;
    });
    setCells(newState);
  };

  useEffect(() => {
    if (settings.settings.isResetCall) {
      // Reset cells
      setCells(
        create2DArray(settings.settings.numOfRows, settings.settings.numOfCols)
      );
      // set isResetCall to false
      settings.setSettings({
        ...settings.settings,
        isResetCall: false,
      });
    }
  }, [settings.settings.isResetCall]);

  return (
    <Wrapper
      numOfCols={settings.settings.numOfCols}
      cellSize={settings.settings.cellSize}
      className="container-cell"
      borderColor={settings.settings.borderColor}
    >
      {cells &&
        cells.map((rows, rowIndex) =>
          rows.map((col, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              status={col}
              updateStatus={() => handleCellClick(rowIndex, colIndex, col)}
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
