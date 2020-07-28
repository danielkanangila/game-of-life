import { useSettings } from "./useSettings";

export const useTheme = () => {
  const {
    borderSize,
    borderColor,
    backgroundColor,
    aliveCellColor,
    deadCellColor,
  } = useSettings().settings;

  return {
    borderSize,
    borderColor,
    backgroundColor,
    aliveCellColor,
    deadCellColor,
  };
};
