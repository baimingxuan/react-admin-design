// import type { PayloadAction } from '@reduxjs/toolkit'
import type { RouteObject } from '@/router/types'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { TagsState } from '@/stores/types'
import type { RootState, AppDispatch } from '..'

const initialState: TagsState = {
  visitedTags: [],
  cachedTags: new Set()
}

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
  extra: { s: string; n: number }
}>()

const tags = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addVisitedTags: (state, action) => {
      const hasExistIndex = state.visitedTags.findIndex(tag => tag.path === action.payload.path)
      if (hasExistIndex < 0) {
        state.visitedTags.push(action.payload)
      } else {
        state.visitedTags[hasExistIndex] = Object.assign({}, state.visitedTags[hasExistIndex], action.payload)
      }
    },
    updateVisitedTags: (state, action) => {
      state.visitedTags = action.payload
    },
    closeTagsByType: (state, action) => {
      let restTags: RouteObject[] = []
      const { type, path } = action.payload
      const { visitedTags } = state
      const tagIndex = visitedTags.findIndex((tag: any) => tag.fullPath === path)
      const affixTags = visitedTags.filter((tag: any) => tag?.meta?.affix)
      switch (type) {
        case 'left':
          restTags = visitedTags.slice(tagIndex)
          break
        case 'right':
          restTags = visitedTags.slice(0, tagIndex + 1)
          break
        case 'other':
          restTags = visitedTags.filter((tag: any) => tag.fullPath === path)
          break
      }
      state.visitedTags = affixTags.concat(restTags.filter((tag: RouteObject) => !tag.meta?.affix))
    },
    updateCacheTags: state => {
      const cachedSet: Set<string> = new Set()
      state.visitedTags.forEach((tag: RouteObject) => {
        if (tag.meta?.keepAlive) {
          cachedSet.add(tag.name!)
        }
      })
      state.cachedTags = cachedSet
    },
    clearCacheTags: state => {
      state.cachedTags = new Set()
    }
  }
})

export const closeTagByKey = createAppAsyncThunk('tags/closeTagByKey', (path: string, { getState, dispatch }) => {
  const { visitedTags } = getState().tags
  const tagIndex = visitedTags.findIndex((tag: any) => tag.fullPath === path)
  const restTags = visitedTags.filter((tag: any) => tag.fullPath !== path)
  dispatch(updateVisitedTags(restTags))
  return Promise.resolve({
    tagIndex,
    tagsList: restTags
  })
})

export const closeAllTags = createAppAsyncThunk('tags/closeAllTags', (_, { getState, dispatch }) => {
  const { visitedTags } = getState().tags
  const restTags = visitedTags.filter((tag: any) => tag?.meta?.affix)
  dispatch(updateVisitedTags(restTags))
  return Promise.resolve(restTags)
})

export const { addVisitedTags, updateVisitedTags, closeTagsByType } = tags.actions

export default tags.reducer
