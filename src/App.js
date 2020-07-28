import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { AppContext } from "./contexts";
import Game from "./components/Game";
import Hamburger from "./components/Hamburger";

function App() {
  // States
  const [settings, setSettings] = useState({
    numOfRows: 25,
    numOfCols: 50,
    cellSize: 20,
    borderSize: 1,
    borderColor: "#fff",
    backgroundColor: "#1B1C1E",
    aliveCellColor: "#fff",
    deadCellColor: "#1B1C1E",
    running: false,
    generations: 0,
    isResetCall: false,
    windowWidth: window.outerHeight,
    windowHeight: window.innerHeight,
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
      <Main className="app" bgColor={settings.backgroundColor}>
        <div className="app-menu">
          <Hamburger onClick={() => {}} />
        </div>
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
  height: 100vh;
  width: 100%;
  position: relative;
  ${({ bgColor }) => `background-color: ${bgColor};`};
  overflow: hidden;
  .app-menu {
    position: absolute;
    top: 15px;
    right: 2rem;
    width: 30px;
    height: 16px;
  }
`;

export default App;
