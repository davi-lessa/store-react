import { createSlice } from '@reduxjs/toolkit'
import { MenuAPIResponse } from 'components/Header'
import { z } from 'zod'

const initialState: {
  menuCategories: MenuAPIResponse['data']
  menuOpen: boolean
  hasSubscribed: boolean
} = {
  menuOpen: false,
  menuCategories: [],
  hasSubscribed: false,
}

initialState.hasSubscribed = localStorage?.getItem('hasSubscribed') === 'true' ? true : false

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
    setSubscribed: (currentState, { payload }) => {
      currentState.hasSubscribed = z.boolean().catch(false).parse(payload)
    },
  },
})

export default commonSlice
export const actions = commonSlice.actions
