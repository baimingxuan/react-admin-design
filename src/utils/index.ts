import { isObject } from './is'

export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string
    noopener?: boolean
    noreferrer?: boolean
  }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

export function promiseTimeout(ms: number, throwOnTimeout = false, reason = 'Timeout'): Promise<void> {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout) setTimeout(() => reject(reason), ms)
    else setTimeout(resolve, ms)
  })
}

export const searchRoute: any = (path: string, routes: any = []) => {
  for (const item of routes) {
    if (item.path === path || item.fullPath === path) return item
    if (item.children) {
      const result = searchRoute(path, item.children)
      if (result) return result
    }
  }
  return null
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}
