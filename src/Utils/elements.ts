import PeriodicTable from "Rsc/periodic-table.json";

export const elementsSymbols = PeriodicTable.elements
  .map(({ symbol }) => symbol.toLocaleLowerCase())
  .filter((symbol) => symbol.length === 2);

export const allElements = PeriodicTable.elements;

export const findElementBySymbol = (search: string) =>
  allElements.find(
    ({ symbol }) => symbol.toLocaleLowerCase() === search.toLocaleLowerCase()
  );
