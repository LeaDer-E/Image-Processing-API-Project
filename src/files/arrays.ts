// Checks if all elements of an array (item) are in another array (arr)
const theArrayItems = (arr: unknown[], items: unknown[]): boolean => {
  return arr.every((item) => items.indexOf(item) !== -1);
};

// Checks if all elements of an array are numbers
const isArrayNumbers = (arr: unknown[]): boolean => {
  return arr.every((item) => Number.isInteger(item));
};

export { theArrayItems, isArrayNumbers };
