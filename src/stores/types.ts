export interface MenuOptions {
  path: string
  title: string
  icon?: string
  isLink?: string
  close?: boolean
  children?: MenuOptions[]
}

export interface MenuState {
  menuList: MenuOptions[]
  isCollapse: boolean
}

export interface BreadcrumbState {
  breadcrumbs: {
    [propName: string]: any
  }
}

export interface TagsState {
	tagsList: MenuOptions[]
  tagsActive: string
}