import { createSlice } from '@reduxjs/toolkit'

const initialState = { menuOpen: false }

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    closeMenu: (currentState) => {
      currentState.menuOpen = false
    },
    openMenu: (currentState) => {
      currentState.menuOpen = true
    },
  },
})

export default commonSlice
export const actions = commonSlice.actions
