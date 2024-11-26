export const truncateString = (str: string, maxLength: number) =>
  str.length <= maxLength ? str : `${str.slice(0, 3)}...${str.slice(-3)}`;
