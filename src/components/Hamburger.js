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
  height: 16px;
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

    &:nth-child(1) {
    }
    &:nth-child(2) {
    }
    &:nth-child(3) {
      width: 70%;
      margin-bottom: 0;
    }
  }
`;

export default Hamburger;
