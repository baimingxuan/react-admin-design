import { createSlice } from '@reduxjs/toolkit'
import { BreadcrumbState } from '@/stores/types'

const initialState: BreadcrumbState = {
  breadcrumbs: {}
}

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action) => {
      state.breadcrumbs = action.payload
    }
  }
})

export const { setBreadcrumbs } = breadcrumbSlice.actions

export default breadcrumbSlice.reducer