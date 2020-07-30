export const offsets = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export const create2DArray = (numOfRows, numOfCols) => {
  return Array.from(Array(parseInt(numOfRows)), () =>
    Array.from(Array(parseInt(numOfCols)), () => 0)
  );
};

export const computeNeighbors = (
  cells,
  rowIndex,
  colIndex,
  numOfRows,
  numOfCols
) => {
  let neighbors = 0;
  offsets.map((offset) => {
    const [x, y] = offset;
    const nRowIndex = rowIndex + x;
    const nColIndex = colIndex + y;
    if (
      nRowIndex >= 0 &&
      nRowIndex < numOfRows &&
      nColIndex >= 0 &&
      nColIndex < numOfCols
    ) {
      neighbors += cells[nRowIndex][nColIndex];
    }
  });
  return neighbors;
};

export const nextGeneration = (
  cells,
  cellsCopy,
  rowIndex,
  colIndex,
  numOfRows,
  numOfCols
) => {
  const aliveNeighbors = computeNeighbors(
    cells,
    rowIndex,
    colIndex,
    numOfRows,
    numOfCols
  );

  if (aliveNeighbors < 2 || aliveNeighbors > 3) {
    cellsCopy[rowIndex][colIndex] = 0;
  } else if (cells[rowIndex][colIndex] === 0 && aliveNeighbors === 3) {
    cellsCopy[rowIndex][colIndex] = 1;
  }

  // New generations
  return cellsCopy;
};
