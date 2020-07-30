import React from "react";
import { useSettings } from "../hooks";
import TextInput from "./TextInput";

const Settings = ({ open, forceUpdate }) => {
  const [settings, setSettings] = useSettings();

  const handleChange = (e) => {
    if (e.target.name === "numOfRows" || e.target.name === "numOfCols") {
      if (e.target.value >= 1) {
        setSettings({
          [e.target.name]: parseInt(e.target.value),
        });
      }
    } else {
      setSettings({
        [e.target.name]: parseInt(e.target.value),
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
        <button onClick={() => forceUpdate((f) => !f)} className="btn">
          Update
        </button>
      </div>
    );
  }
  return <></>;
};

export default Settings;
