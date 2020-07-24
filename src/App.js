import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import produce from "immer";

import Header from "./components/Header";
import Cells from "./components/cells/Cells";
import { AppContext } from "./contexts";
import { newGenerations } from "./utils";

function App() {
  // States
  const [settings, setSettings] = useState({
    numOfRows: 25,
    numOfCols: 25,
    cellSize: 20,
    borderSize: 1,
    borderColor: "#f1f1f1",
    backgroundColor: "#fff",
    aliveCellColor: "#000",
    deadCellColor: "#fff",
    running: false,
    generations: 0,
    isResetCall: false,
  });
  const [gameplay, setGameplay] = useState({
    currentGenerations: null,
    newGenerations: null,
    generations: 0,
  });
  const [numOfRows, setNumOfRows] = useState(25);
  const [numOfCols, setNumOfCols] = useState(25);

  const runSimulation = useCallback(() => {
    // if (!runningRef.current) {
    //   return;
    // }
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
    // setTimeout(runSimulation, 100);
  }, []);

  return (
    <AppContext.Provider
      value={{ settings, setSettings, gameplay, setGameplay }}
    >
      <Main className="app">
        <Header />
        <Cells />
      </Main>
    </AppContext.Provider>
  );
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 2rem;
`;

export default App;
