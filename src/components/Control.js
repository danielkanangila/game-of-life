import React from "react";
import styled from "styled-components";
import { useSettings } from "../hooks/useSettings";
import Icon from "./Icon";

const Control = ({ onPlay, onStop, onSeed, running, setRunning }) => {
  const [settings, setSettings] = useSettings();

  const onRunning = async () => {
    await onPlay();
    setRunning(!running);
  };
  return (
    <Wrapper className="header">
      <div className="btn-group">
        <button onClick={onRunning} className="btn">
          <Icon name={running ? "pause" : "play_arrow"} />
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={onStop} className="btn">
          <Icon name="stop" />
          Stop
        </button>
        <button onClick={onSeed} className="btn">
          <Icon name="blur_on" />
          Seed
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 80%;
  left: 10%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 750px) {
    width: 35%;
    left: 32.5%;
  }
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  -webkit-box-shadow: -1px 3px 6px -1px rgba(105, 105, 105, 1);
  -moz-box-shadow: -1px 3px 6px -1px rgba(105, 105, 105, 1);
  box-shadow: -1px 3px 6px -1px rgba(105, 105, 105, 1);
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#45484d+0,000000+100;Black+3D+%231 */
  background: #45484d; /* Old browsers */
  background: -moz-linear-gradient(
    top,
    #45484d 0%,
    #000000 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    #45484d 0%,
    #000000 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    #45484d 0%,
    #000000 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=0 ); /* IE6-9 */

  .btn-group {
    display: flex;
    align-items: center;
    .btn {
      color: #fff;
      display: flex;
      align-items: center;
      height: 36px;
      padding: 10px 17px;
      span {
        font-size: 1rem;
        margin-right: 5px;
      }
      &:nth-child(1) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:nth-child(2) {
        border-left: none;
        border-right: none;
        border-radius: 0;
      }
      &:nth-child(3) {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &:hover {
        background-color: #fff;
        color: #45484d;
      }
    }
  }
`;

export default Control;
