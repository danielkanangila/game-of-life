import React from "react";
import styled from "styled-components";

const Cell = ({ size, status, updateStatus, borderSize, borderColor }) => {
  return (
    <Wrapper
      onClick={updateStatus}
      className={`cell ${status ? "alive" : "dead"}`}
      size={size}
      borderSize={borderSize}
      borderColor={borderColor}
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
