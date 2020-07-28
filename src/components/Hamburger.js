import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";

const Hamburger = ({ onClick }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClick = () => {
    setOpen((open) => !open);
    onClick();
  };

  return (
    <Wrapper onClick={handleClick} bgColor={theme.borderColor}>
      <span className={`menu-item${open ? " open" : ""}`}></span>
      <span className={`menu-item${open ? " open" : ""}`}></span>
      <span className={`menu-item${open ? " open" : ""}`}></span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  cursor: pointer;
  span {
    display: block;
    width: 30px;
    height: 2px;
    margin-bottom: 4px;
    ${({ bgColor }) => `background-color: ${bgColor}`};
    transition: all 0.3s;
    &.open {
      position: absolute;
      width: 25px;
      top: 10px;
    }
    &:nth-child(1) {
      &.open {
        transform: rotate(-45deg);
      }
    }
    &:nth-child(2) {
      &.open {
        display: none;
      }
    }
    &:nth-child(3) {
      width: 70%;
      margin-bottom: 0;
      &.open {
        width: 25px;
        transform: rotate(45deg);
      }
    }
  }
`;

export default Hamburger;
