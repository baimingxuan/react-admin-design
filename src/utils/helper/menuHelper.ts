/**
 * @description Get expand subMenu
 * @param {String} path Current route path
 * @returns subMenu array
 */
export const getOpenKeys = (path: string) => {
  let pathStr: string = ''
  const openKeys: string[] = []
  path.split('/').forEach(key => {
    if (key) {
      pathStr += '/' + key
      openKeys.push(pathStr)
    }
  })
  return openKeys.slice(0, -1)
}
