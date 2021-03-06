import React from "react";
import styled from "styled-components";

import Cell from "./Cell";
import { useSettings } from "../../hooks";

const Cells = ({ cells, handleCellClick }) => {
  const [settings] = useSettings();
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
              val={col}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex, col)}
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
