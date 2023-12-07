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
    addVisitedTags: (state, action) => {}
  }
})

export const { addVisitedTags } = tags.actions

export default tags.reducer
