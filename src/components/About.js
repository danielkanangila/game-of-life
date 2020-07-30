import React from "react";
import styled from "styled-components";
import { useTheme } from "../hooks/useTheme";

const About = ({ open }) => {
  const theme = useTheme();
  if (open === "about") {
    return (
      <Wrapper theme={theme}>
        <h1>Game of Life</h1>
        <p>
          The Game of Life, also known simply as Life, is a cellular automaton
          devised by the British mathematician John Horton Conway in 1970. It is
          a zero-player game, meaning that its evolution is determined by its
          initial state, requiring no further input. One interacts with the Game
          of Life by creating an initial configuration and observing how it
          evolves. It is Turing complete and can simulate a universal
          constructor or any other Turing machine.
        </p>
        <h2>Rules</h2>
        <p>
          The universe of the Game of Life is an infinite, two-dimensional
          orthogonal grid of square cells, each of which is in one of two
          possible states, live or dead, (or populated and unpopulated,
          respectively). Every cell interacts with its eight neighbours, which
          are the cells that are horizontally, vertically, or diagonally
          adjacent. At each step in time, the following transitions occur:
        </p>
        <ol>
          <li>
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ol>
        <p>
          These rules, which compare the behavior of the automaton to real life,
          can be condensed into the following:
        </p>
        <ol>
          <li>Any live cell with two or three live neighbours survives.</li>
          <li>Any dead cell with three live neighbours becomes a live cell.</li>
          <li>
            All other live cells die in the next generation. Similarly, all
            other dead cells stay dead.
          </li>
        </ol>
        <p>
          Source:
          <br />
          <a
            target="_blank"
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          >
            https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
          </a>
        </p>
      </Wrapper>
    );
  }
  return <></>;
};

const Wrapper = styled.div`
  padding: 15px 15px 30px;
  ${({ theme }) => `color: ${theme.borderColor}`};
  h2,
  h1 {
    margin: 15px 0;
  }
  ol {
    margin: 15px 0px 15px 50px;
  }
  a {
    color: #fff;
    transition: .3s
    &:hover {
      color: blue;
    }
  }
`;

export default About;
