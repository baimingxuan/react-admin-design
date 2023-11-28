import type { RouteObject, AppMenu } from '../types'
import { cloneDeep } from 'lodash-es'
import { isUrl } from '@/utils/is'
import { treeMap } from '@/utils/helper/treeHelper'

function joinParentPath(menus: AppMenu[], parentPath = '') {
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

  const list = treeMap(cloneRoutes, {
    conversion: (node: RouteObject) => {
      const { meta: { title, hideMenu = false, ...rest } = {} } = node

      return {
        ...(rest || {}),
        name: title,
        hideMenu,
        path: node.path
      }
    }
  }) as AppMenu[]

  joinParentPath(list)
  return cloneDeep(list)
}
