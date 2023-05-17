export interface MenuOptions {
  path: string
  title: string
  icon?: string
  isLink?: string
  close?: boolean
  children?: MenuOptions[]
}

export interface MenuState {
  isCollapse: boolean
  menuList: MenuOptions[]
}

export interface BreadcrumbState {
  breadcrumbList: {
    [propName: string]: any
  }
}