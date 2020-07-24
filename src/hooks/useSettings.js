import { useContext } from "react";
import { AppContext } from "../contexts";

export const useSettings = () => {
  const { settings, setSettings } = useContext(AppContext);
  return { settings, setSettings };
};
