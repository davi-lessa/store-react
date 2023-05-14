import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './reducers/cart'

export const store = configureStore({
  reducer: {
    // Slices
    cart: cartSlice.reducer,
  },
})

store.subscribe(() => {
  localStorage.setItem('cart_items', JSON.stringify(store.getState().cart.items, null, 0))
})

export type RootState = ReturnType<typeof store.getState>
