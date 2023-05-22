import type { RouteObject } from './types'
import { cloneDeep } from 'lodash-es'
import { isUrl } from '@/utils/is'

function joinParentPath(menus: any[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // Note that nested paths that start with / will be treated as a root path.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // Path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  }
}


export function transformRouteToMenu(routes: RouteObject[]) {
  const cloneRoutes = cloneDeep(routes)


}