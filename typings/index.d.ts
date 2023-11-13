declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type AnyFn = (...args: any[]) => any

declare type TargetContext = '_self' | '_blank'

declare module 'react-org-tree'