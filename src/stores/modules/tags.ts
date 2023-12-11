import { createSlice } from '@reduxjs/toolkit'
import { TagsState } from '@/stores/types'

const initialState: TagsState = {
  visitedTags: [],
  cachedTags: []
}

const tags = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addVisitedTags: (state, action) => {
      const hasExistIndex = state.visitedTags.findIndex(item => item.path === action.payload.path)
      if (hasExistIndex < 0) {
        state.visitedTags.push(action.payload)
      } else {
        state.visitedTags[hasExistIndex] = Object.assign({}, state.visitedTags[hasExistIndex], action.payload)
      }
    }
  }
})

export const { addVisitedTags } = tags.actions

export default tags.reducer
