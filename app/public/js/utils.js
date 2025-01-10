export async function delay( ms ) {
  return new Promise((res) => {
    setTimeout(() => res(true), ms);
  });
}

/**
 * 
 * @param {string} kvpString 
 * @param {*} defaultValue 
 * @returns 
 */
export function parseKVPString(kvpString, defaultValue = true) {
  const lines = kvpString.trim().split(/\s*,\s*/);
  const pairs = lines.map((line) => line.split(/\s*:\s*/));
  const map = pairs.reduce((result, [key, value]) => {
    if (key) {
      result[key] = value !== undefined ? value : defaultValue;
    }
    return result;
  }, {});
  return map;
}