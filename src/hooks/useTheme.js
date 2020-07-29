import { useSettings } from "./useSettings";

export const useTheme = () => {
  const [settings] = useSettings();
  const {
    borderSize,
    borderColor,
    backgroundColor,
    aliveCellColor,
    deadCellColor,
  } = settings;

  return {
    borderSize,
    borderColor,
    backgroundColor,
    aliveCellColor,
    deadCellColor,
  };
};
