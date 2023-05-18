import { MenuOptions } from '../../types'
import * as types from '../../constant'

export const setTagsList = (tagsList: MenuOptions[]) => ({
  type: types.SET_TAGS_LIST,
  tagsList
})

export const setTagsActive = (tagsActive: string) => ({
  type: types.SET_TAGS_ACTIVE,
  tagsActive
})