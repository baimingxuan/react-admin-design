import { createSlice } from '@reduxjs/toolkit'
import { TagsState } from '@/stores/types'

const initialState: TagsState = {
  visitedTags: [],
  cachedTags: new Set()
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addVisitedTags: (state, action) => {}
  }
})

export const { addVisitedTags } = tagsSlice.actions

export default tagsSlice.reducer
