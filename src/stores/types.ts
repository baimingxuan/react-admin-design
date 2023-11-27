export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  token: string
  desc?: string
  homePath?: string
}

export interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  sessionTimeout?: boolean
  lastUpdateTime: number
}

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
