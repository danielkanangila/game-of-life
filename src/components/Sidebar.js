import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";
import Settings from "./Settings";
import Presets from "./Presets";
import About from "./About";

const Sidebar = ({ className, forceUpdate }) => {
  const [open, setOpen] = useState("preset");
  const theme = useTheme();

  return (
    <Wrapper id="sidebar" className={className} theme={theme}>
      <div className="header-tab">
        <span
          className={`tab${open === "preset" ? " active" : ""}`}
          onClick={() => setOpen("preset")}
        >
          Presets
        </span>
        <span
          className={`tab${open === "settings" ? " active" : ""}`}
          onClick={() => setOpen("settings")}
        >
          Settings
        </span>
        <span
          className={`tab${open === "about" ? " active" : ""}`}
          onClick={() => setOpen("about")}
        >
          About
        </span>
      </div>
      <Presets open={open} forceUpdate={forceUpdate} />
      <Settings open={open} forceUpdate={forceUpdate} />
      <About open={open} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 450px;
  width: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  right: 0;
  ${({ theme }) => `background-color: ${theme.backgroundColor};`}
  transition: all 0.5s;
  -webkit-box-shadow: -5px 1px 9px -1px rgba(51, 51, 51, 1);
  -moz-box-shadow: -5px 1px 9px -1px rgba(51, 51, 51, 1);
  box-shadow: -5px 1px 9px -1px rgba(51, 51, 51, 1);
  z-index: 800;
  .header-tab {
    width: 50px;
    margin-top: 50px;
    display: flex;
    width: 100%;
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
    span {
      display: block;
      padding: 15px;
      ${({ theme }) => `color: ${theme.borderColor}`};
      cursor: pointer;
      transition: all 0.3s;
      &.active,
      &:hover {
        ${({ theme }) =>
          `color: ${theme.backgroundColor}; background-color: ${theme.borderColor}`};
      }
    }
  }
  .settings,
  .presets {
    padding: 15px;
  }
  .settings {
    .btn {
      color: #fff;
      &:hover {
        color: #1b1c1e;
        background-color: #fff;
      }
    }
  }

  .presets-item {
    h2 {
      font-size: 1rem;
      ${({ theme }) => `color: ${theme.borderColor}`};
      padding: 15px 0;
    }
    img {
      width: 150px;
      height: 100px;
      cursor: pointer;
    }
  }
`;

export default Sidebar;
