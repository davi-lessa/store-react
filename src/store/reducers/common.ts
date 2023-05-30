import { createSlice } from '@reduxjs/toolkit'
import { MenuAPIResponse } from 'components/Header'

const initialState: { menuCategories: MenuAPIResponse['data']; menuOpen: boolean } = { menuOpen: false, menuCategories: [] }

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
    setMenuCategories: (currentState, { payload }: { payload: MenuAPIResponse['data'] }) => {
      currentState.menuCategories = [...payload]
    },
  },
})

export default commonSlice
export const actions = commonSlice.actions
