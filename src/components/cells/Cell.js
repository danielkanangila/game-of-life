import React from "react";
import styled from "styled-components";
import { useSettings } from "../../hooks/useSettings";

const Cell = ({ status, updateStatus }) => {
  const settings = useSettings();

  return (
    <Wrapper
      onClick={updateStatus}
      className={`cell ${status ? "alive" : "dead"}`}
      size={settings.settings.cellSize}
      borderSize={settings.settings.borderSize}
      borderColor={settings.settings.borderColor}
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
