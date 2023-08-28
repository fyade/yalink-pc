/**
 * 扁平化对象数组
 * @param arg
 */
export function flatObjectArray(arg) {
  if (arg.length === 0) return [];
  let ret = [];
  const assist_flatObjectArray = arr => {
    for (let i = 0; i < arr.length; i++) {
      const { children, ...objs } = arr[i];
      ret.push(objs);
      assist_flatObjectArray(arr[i].children);
    }
  }
  assist_flatObjectArray(arg);
  return ret;
}
