/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }

  if (size === 0) {
    return '';
  }
  
  let counter = 0;
  const result = [];

  for (const symbol of string) {
    if (result[result.length - 1] === symbol) {
      if (counter < size) {
        result.push(symbol);
        counter += 1;
      }
    } else {
      counter = 1;
      result.push(symbol);
    }
  }

  return result.join('');
}
