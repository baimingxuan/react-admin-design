declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type TargetContext = '_self' | '_blank'