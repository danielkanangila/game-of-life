import React, { useState } from "react";
import { useSettings } from "../hooks";
import TextInput from "./TextInput";

const Settings = ({ open }) => {
  const [settings, setSettings] = useSettings();
  const { numOfRows, numOfCols, cellSize } = settings;
  const [state, setState] = useState({
    numOfRows,
    numOfCols,
    cellSize,
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const onUpdate = () => {
    if (state.numOfRows < 2 || state.numOfCols < 2 || state.cellSize < 10) {
      setError(
        "Rows number and Columns number must equal or greater than 2, and cell size must be equal or greater than 10"
      );
      return;
    }
    setSettings({
      ...settings,
      ...state,
    });
  };

  if (open === "settings") {
    return (
      <div className="settings">
        <TextInput
          label="Rows #"
          type="number"
          name="numOfRows"
          value={state.numOfRows}
          handleChange={handleChange}
        />
        <TextInput
          label="Columns #"
          type="number"
          name="numOfCols"
          value={state.numOfCols}
          handleChange={handleChange}
        />
        <TextInput
          label="Cell size"
          type="number"
          name="cellSize"
          value={state.cellSize}
          handleChange={handleChange}
        />
        <button onClick={onUpdate} className="btn">
          Update
        </button>
        {error && <div className="alert danger">{error}</div>}
      </div>
    );
  }
  return <></>;
};

export default Settings;
