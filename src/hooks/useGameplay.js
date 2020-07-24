import { useContext, useCallback, useEffect, useState } from "react";

import { AppContext, GameContext } from "../contexts";
import { useSettings } from "./useSettings";
import { create2DArray, newGenerations } from "../utils";
import produce from "immer";

export const useGameplay = () => {
  const { gameplay, setGameplay } = useContext(GameContext) || {};
  const { settings, setSettings } = useSettings();
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (settings.isResetCall) {
      // Reset cells
      setGameplay({
        ...gameplay,
        cells: create2DArray(settings.numOfRows, settings.numOfCols),
      });
      // set isResetCall to false
      setSettings({
        ...settings,
        isResetCall: false,
      });
    }
  }, [settings.isResetCall]);

  const runSimulation = useCallback((cells) => {
    // const __newGenerations = produce(cells, (cellsCopy) => {

    // });
    let newG;
    cells.map((rows, rowIndex) => {
      rows.map((col, colIndex) => {
        newG = newGenerations(
          cells,
          [],
          rowIndex,
          colIndex,
          settings.numOfRows,
          settings.numOfCols
        );
      });
    });
    console.log(newG);
    // setGrid((cells) => {
    //   return produce(cells, (cellsCopy) => {
    //     cells.map((rows, rowIndex) => {
    //       rows.map((col, colIndex) => {
    //         cellsCopy = newGenerations(
    //           cells,
    //           cellsCopy,
    //           rowIndex,
    //           colIndex,
    //           numOfRows,
    //           numOfCols
    //         );
    //       });
    //     });
    //   });
    // });
    setGameplay({
      ...gameplay,
      generations: gameplay.generations++,
      cells,
    });
  }, []);

  const play = ({ action = "initialize", data }) => {
    switch (action) {
      case "initialize":
        setGameplay(data);
        break;
      case "run":
        if (data.running)
          setTimer(setInterval(() => runSimulation(data.cells), 100));
        else clearInterval(timer);
        break;
      default:
    }
  };

  return { gameplay, play };
};
