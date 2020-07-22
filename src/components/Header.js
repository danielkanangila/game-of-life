import React from "react";
import styled from "styled-components";

const Header = ({ generations, onRunning, onReset, stimulationState }) => {
  return (
    <Wrapper className="header">
      <div className="btn-group">
        <button onClick={onRunning} className="btn">
          {stimulationState ? "Stop" : "Start"}
        </button>
        <button onClick={onReset} className="btn">
          Reset
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default Header;
