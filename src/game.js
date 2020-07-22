import { create2DArray } from "./utils";
export const countAliveNbCell = (
  grid,
  currentRowIndex,
  currentColIndex,
  numOfRows,
  numOfCols
) => {
  let aliveNbCell = 0;

  for (var x = -1; x <= 1; x++) {
    for (var y = -1; y <= 1; y++) {
      if (
        currentRowIndex + x >= 0 &&
        currentRowIndex + x < numOfRows &&
        currentColIndex + y >= 0 &&
        currentColIndex + y < numOfCols
      ) {
        if (!(x == 0 && y == 0)) {
          aliveNbCell += grid[currentRowIndex + x][currentColIndex + y];
        }
      }
    }
  }

  return aliveNbCell;
};

export const applyRules = (
  current,
  newGrid,
  aliveNbCell,
  currentRowIndex,
  currentColIndex
) => {
  if (current == 0 && aliveNbCell == 3) {
    newGrid[currentRowIndex][currentColIndex] = 1;
  } else if (current == 1 && (aliveNbCell < 2 || aliveNbCell > 3)) {
    newGrid[currentRowIndex][currentColIndex] = 0;
  } else {
    newGrid[currentRowIndex][currentColIndex] = current;
  }

  return newGrid;
};

export const runGame = (grid, numOfRows, numOfCols) => {
  let newGrid = create2DArray(numOfRows, numOfCols);

  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfRows; j++) {
      const current = grid[i][j];
      const aliveNb = countAliveNbCell(grid, i, j, numOfRows, numOfCols);
      newGrid = applyRules(current, newGrid, aliveNb, i, j);
    }
  }
  return newGrid;
};
