import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";
import TextInput from "./TextInput";
import { useSettings } from "../hooks";

const Sidebar = ({ className }) => {
  const [open, setOpen] = useState("settings");
  const theme = useTheme();

  return (
    <Wrapper id="sidebar" className={className} theme={theme}>
      <div className="header-tab">
        <span
          className={`tab${open === "preset" ? " active" : ""}`}
          onClick={() => setOpen("preset")}
        >
          Preset
        </span>
        <span
          className={`tab${open === "settings" ? " active" : ""}`}
          onClick={() => setOpen("settings")}
        >
          Settings
        </span>
      </div>
      <Preset open={open} />
      <Settings open={open} />
    </Wrapper>
  );
};

const Settings = ({ open }) => {
  const { settings, setSettings } = useSettings();

  const handleChange = (e) => {
    if (e.target.name === "numOfRows" || e.target.name === "numOfCols") {
      if (e.target.value >= 1) {
        setSettings({
          ...settings,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setSettings({
        ...settings,
        [e.target.name]: e.target.value,
      });
    }
  };

  if (open === "settings") {
    return (
      <div className="settings">
        <TextInput
          label="Rows #"
          type="number"
          name="numOfRows"
          value={settings.numOfRows}
          handleChange={handleChange}
        />
        <TextInput
          label="Columns #"
          type="number"
          name="numOfCols"
          value={settings.numOfCols}
          handleChange={handleChange}
        />
        <TextInput
          label="Cell size"
          type="number"
          name="cellSize"
          value={settings.cellSize}
          handleChange={handleChange}
        />
      </div>
    );
  }
  return <></>;
};

const Preset = ({ open }) => {
  if (open === "preset") {
    return <div className="preset"></div>;
  }
  return <></>;
};

const Wrapper = styled.div`
  max-width: 350px;
  width: 0;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  right: 0;
  ${({ theme }) => `background-color: ${theme.backgroundColor};`}
  transition: all 0.3s;
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
  .preset {
    padding: 15px;
  }
`;

export default Sidebar;
