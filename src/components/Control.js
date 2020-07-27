import React from "react";
import styled from "styled-components";
import { useSettings } from "../hooks/useSettings";

const Control = ({ onPlay, onStop, onSeed }) => {
  const { settings, setSettings } = useSettings();

  const onRunning = async () => {
    await onPlay();
    setSettings({
      ...settings,
      running: !settings.running,
    });
  };
  return (
    <Wrapper className="header">
      {/* <div className="gen-display">
        <span>Generations</span>
        <span>{gameplay?.generations}</span>
      </div> */}
      <div className="btn-group">
        <button onClick={onRunning} className="btn">
          {settings.running ? "Pause" : "Start"}
        </button>
        <button onClick={onStop} className="btn">
          Stop
        </button>
        <button onClick={onSeed} className="btn">
          Seed
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  .gen-display {
    span {
      padding: 10px;
      text-transform: uppercase;
      border: 2px solid #ccc;
      font-size: 0.7rem;
      font-weight: bold;
      &:first-child {
        background-color: #f1f1f1;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: 0;
      }
      &:last-child {
        padding: 10px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
`;

export default Control;
