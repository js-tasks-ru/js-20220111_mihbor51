/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (!arr) {
    return [];
  }

  const newArr = [];
  for (const el of arr) {
    if (newArr.indexOf(el) === -1) {
      newArr.push(el);
    }
  }

  return newArr;
}