import React from "react";
import styled from "styled-components";
import produce from "immer";

import { useSettings, useGameplay } from "../../hooks";

const Cell = ({ rowIndex, colIndex, val }) => {
  const { settings } = useSettings();
  const { gameplay, play } = useGameplay();

  const handleClick = () => {
    if (settings.running) return;

    const newState = produce(gameplay.cells, (cellsCopy) => {
      cellsCopy[rowIndex][colIndex] = val ? 0 : 1;
    });
    play({
      action: "initialize",
      data: {
        ...gameplay,
        cells: newState,
      },
    });
  };

  return (
    <Wrapper
      onClick={handleClick}
      className={`cell ${val ? "alive" : "dead"}`}
      size={settings.cellSize}
      borderSize={settings.borderSize}
      borderColor={settings.borderColor}
    ></Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ size, borderSize, borderColor }) => `
    width: ${size}px; height: ${size}px;
    border-bottom: ${borderSize}px solid ${borderColor};
    border-right: ${borderSize}px solid ${borderColor};
 `};
  &.alive {
    background-color: black;
  }
  &.dead {
    background-color: white;
  }
`;

export default Cell;
