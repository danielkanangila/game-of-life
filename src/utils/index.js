export const create2DArray = (numOfRows, numOfCols) => {
  return Array.from(Array(numOfRows), () =>
    Array.from(Array(numOfCols), () => 0)
  );
};
