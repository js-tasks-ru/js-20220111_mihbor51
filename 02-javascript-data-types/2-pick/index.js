/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const copyObj = {...obj}; 
  for (const key in obj) {
    if (!fields.includes(key)) {
      delete copyObj[key];
    }
  }
  return copyObj;
};
