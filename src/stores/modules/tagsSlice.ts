import { createSlice } from '@reduxjs/toolkit'
import { TagsState } from '@/stores/types'

const initialState: TagsState = {
  tagsList: [{
    title: '首页',
    path: '/home'
  }],
  tagsActive: '/home'
}

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTagsList: (state, action) => {
      state.tagsList = action.payload
    },
    setTagsActive: (state, action) => {
      state.tagsActive = action.payload
    }
  }
})

export const { setTagsList, setTagsActive } = tagsSlice.actions

export default tagsSlice.reducer