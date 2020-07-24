import React, { useState } from "react";
import styled from "styled-components";

import Control from "./components/Control";
import Cells from "./components/cells/Cells";
import { AppContext } from "./contexts";
import Game from "./components/Game";

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
    cells: [],
    newGenerations: null,
    generations: 0,
  });

  return (
    <AppContext.Provider
      value={{ settings, setSettings, gameplay, setGameplay }}
    >
      <Main className="app">
        <Game />
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
