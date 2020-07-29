import React, { useState } from "react";
import styled from "styled-components";

import Game from "./components/Game";
import Hamburger from "./components/Hamburger";
import Sidebar from "./components/Sidebar";
import Logo from "./components/Logo";
import { useSettings } from "./hooks";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [settings] = useSettings();

  return (
    <Main className="app" bgColor={settings.backgroundColor}>
      <div className="logo">
        <Logo />
      </div>
      <div className={`app-menu${openSidebar ? " sb-open" : ""}`}>
        <Hamburger onClick={() => setOpenSidebar((status) => !status)} />
      </div>
      <Sidebar
        className={`sidebar${openSidebar ? " sidebar-open" : " sidebar-close"}`}
      />
      <Game />
    </Main>
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
