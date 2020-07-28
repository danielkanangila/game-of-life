import React from "react";
import styled from "styled-components";

import { useSettings } from "../../hooks";

const Cell = ({ val, onClick }) => {
  const { settings } = useSettings();

  return (
    <Wrapper
      onClick={onClick}
      className={`cell ${val ? "alive" : "dead"}`}
      size={settings.cellSize}
      borderSize={settings.borderSize}
      borderColor={settings.borderColor}
      aliveCellColor={settings.aliveCellColor}
      deadCellColor={settings.deadCellColor}
    ></Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ size, borderSize, borderColor, aliveCellColor, deadCellColor }) => `
    width: ${size}px; height: ${size}px;
    border-bottom: ${borderSize}px solid ${borderColor};
    border-right: ${borderSize}px solid ${borderColor};
    &.alive {
      background-color: ${aliveCellColor};
      border-color: ${deadCellColor};
    }
    &.dead {
      background-color: ${deadCellColor};
    }
 `};
`;

export default Cell;
