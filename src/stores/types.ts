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
  breadcrumbs: {
    [propName: string]: any
  }
}

export interface TagsState {
	tagsActive: string
	tagsList: MenuOptions[]
}