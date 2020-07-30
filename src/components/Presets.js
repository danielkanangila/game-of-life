import React from "react";
import { useSettings } from "../hooks";

const Presets = ({ open, forceUpdate }) => {
  if (open === "preset") {
    const presets = require("./../presets.json");
    return (
      <div className="presets">
        {presets?.map((preset) => (
          <Preset key={preset.name} {...preset} forceUpdate={forceUpdate} />
        ))}
      </div>
    );
  }
  return <></>;
};

const Preset = ({ name, image, cells }) => {
  const [settings, setSettings] = useSettings();
  const handleClick = (preset) => {
    setSettings({
      ...settings,
      preset,
    });
  };

  return (
    <div className="presets-item">
      <h2>{name}</h2>
      <img
        onClick={() => handleClick(cells)}
        src={require(`./../img/${image}.png`)}
        alt={name}
      />
    </div>
  );
};

export default Presets;
