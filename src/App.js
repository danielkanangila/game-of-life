import React, { useState } from "react";
import styled from "styled-components";

import { AppContext } from "./contexts";
import Game from "./components/Game";
import Hamburger from "./components/Hamburger";
import Sidebar from "./components/Sidebar";
import Logo from "./components/Logo";
import { useForceUpdate } from "./hooks";
import { create2DArray } from "./utils";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [settings, setSettings] = useState({
    numOfRows: 25,
    numOfCols: 50,
    initialCells: create2DArray(25, 50),
    cellSize: 20,
    borderSize: 1,
    borderColor: "#fff",
    backgroundColor: "#1B1C1E",
    aliveCellColor: "#fff",
    deadCellColor: "#1B1C1E",
    running: false,
    windowWidth: window.outerHeight,
    windowHeight: window.innerHeight,
    preset: [],
  });
  const { forceUpdate } = useForceUpdate();

  return (
    <AppContext.Provider value={{ settings, setSettings }}>
      <Main className="app" bgColor={settings.backgroundColor}>
        <div className="logo">
          <Logo />
        </div>
        <div className={`app-menu${openSidebar ? " sb-open" : ""}`}>
          <Hamburger onClick={() => setOpenSidebar((status) => !status)} />
        </div>
        <Sidebar
          className={`sidebar${
            openSidebar ? " sidebar-open" : " sidebar-close"
          }`}
          forceUpdate={forceUpdate}
        />
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
    height: 30px;
    z-index: 900;
  }
  .sidebar {
    &-open {
      width: 100%;
    }
    &-close {
      width: 0;
    }
  }
  .logo {
    display: none;
    @media (min-width: 750px) {
      display: block;
      position: absolute;
      top: 15px;
      left: 2rem;
    }
  }
`;

export default App;
