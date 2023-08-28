/**
 * 深拷贝
 * @param source
 * @param cache
 * @returns {any}
 */
export const deepClone = (source, cache) => {
  return JSON.parse(JSON.stringify(source))
}