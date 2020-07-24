import React, { useState } from "react";
import styled from "styled-components";

import { GameContext } from "../contexts";
import Control from "./Control";
import Cells from "./cells/Cells";
import { create2DArray } from "../utils";
import { useSettings } from "../hooks";

const Game = () => {
  const { settings } = useSettings();
  const [gameplay, setGameplay] = useState({
    cells: create2DArray(settings.numOfRows, settings.numOfCols),
    newGenerations: null,
    generations: 0,
  });
  return (
    <GameContext.Provider value={{ gameplay, setGameplay }}>
      <Wrapper>
        <Control />
        <Cells />
      </Wrapper>
    </GameContext.Provider>
  );
};

const Wrapper = styled.div``;

export default Game;
