export const genInitialCellularGrid = (numOfRows, numOfCols) => {
  return Array.from(Array(numOfRows), () =>
    Array.from(Array(numOfCols), () => 0)
  );
};
