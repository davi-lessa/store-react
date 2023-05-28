import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './reducers/cart'
import authSlice from './reducers/auth'
import commonSlice from './reducers/common'

export const store = configureStore({
  reducer: {
    // Slices
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    common: commonSlice.reducer,
  },
})

store.subscribe(() => {
  const { cart, auth } = store.getState()
  localStorage.setItem('cart_items', JSON.stringify(cart.items, null, 0))
  sessionStorage.setItem('mxd_auth', JSON.stringify(auth))
})

export type RootState = ReturnType<typeof store.getState>
