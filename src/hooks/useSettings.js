import { useState } from "react";

export const useSettings = () => {
  const [settings, updateSettings] = useState({
    numOfRows: 25,
    numOfCols: 50,
    cellSize: 20,
    borderSize: 1,
    borderColor: "#fff",
    backgroundColor: "#1B1C1E",
    aliveCellColor: "#fff",
    deadCellColor: "#1B1C1E",
    running: false,
    windowWidth: window.outerHeight,
    windowHeight: window.innerHeight,
    preset: [],
  });
  const setSettings = (value) => {
    updateSettings({
      ...settings,
      ...value,
    });
  };
  return [settings, setSettings];
};
