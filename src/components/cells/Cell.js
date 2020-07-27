import React from "react";
import styled from "styled-components";
import produce from "immer";

import { useSettings } from "../../hooks";

const Cell = ({ rowIndex, colIndex, val, onClick }) => {
  const { settings } = useSettings();

  return (
    <Wrapper
      onClick={onClick}
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
