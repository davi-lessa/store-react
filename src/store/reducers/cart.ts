import { createSlice } from '@reduxjs/toolkit'
import { generalSettings } from 'settings'
import { ExpectedCartItem } from 'types/cart-expected-product'
import { ProductItem } from 'types/product.item'
import { expectedCartArraySchema } from './cart.validation'

const storedItemsRaw = localStorage?.getItem('cart_items')

// Validate stored cart entries
function getAndValidateStoredItems(): ExpectedCartItem[] {
  try {
    if (!storedItemsRaw) throw new Error('cart not stored')

    const cartItems: ExpectedCartItem[] = JSON?.parse(storedItemsRaw)
    expectedCartArraySchema.parse(cartItems)

    return cartItems
  } catch (error) {
    localStorage.setItem('cart_items', '[]')
    return []
  }
}

const initialState: { items: ExpectedCartItem[]; isCartOpen: boolean } = {
  items: getAndValidateStoredItems(),
  isCartOpen: false,
}

export interface ExpectedAddPayload extends ProductItem {
  qty: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOpen: (currentState) => {
      currentState.isCartOpen = true
    },
    setCartClosed: (currentState) => {
      currentState.isCartOpen = false
    },
    removeItem: (currentState, { payload }: { payload: { itemId: number } }) => {
      currentState.items = currentState.items.filter((item) => item.id != payload.itemId)
    },
    removeQty: (currentState, { payload }: { payload: { itemId: number; qtyToChange: number } }) => {
      const item = currentState.items.find((item) => item.id === payload.itemId)
      if (!item || item.qty - payload.qtyToChange < 1) return
      item.qty--
    },
    addQty: (currentState, { payload }: { payload: { itemId: number; qtyToChange: number } }) => {
      const item = currentState.items.find((item) => item.id === payload.itemId)
      if (!item || item.qty + payload.qtyToChange > generalSettings.max_cart_items) return
      item.qty++
    },
    addItem: (currentState, { payload }: { payload: ExpectedAddPayload }) => {
      const itemInCart = currentState.items.find((item) => item.id === payload.skus?.data[0].id)

      if (itemInCart) {
        const currentQty = itemInCart?.qty || 1
        const qtyToAdd = payload.qty

        const newQty = itemInCart.qty + qtyToAdd > generalSettings.max_cart_items ? generalSettings.max_cart_items : currentQty + qtyToAdd
        itemInCart.qty = newQty
      } else {
        const currentSKU = payload.skus.data[0]
        const {
          allow_sell_without_customization,
          availability,
          combinations,
          customizations,
          id,
          product_id,
          price_sale,
          price_discount,
          purchase_url,
          sku,
          title,
          variations,
          height,
          length,
          width,
          weight,
        } = currentSKU

        currentState.items.push({
          allow_sell_without_customization,
          availability,
          combinations,
          customizations,
          id,
          product_id,
          images: {
            data: [payload.images.data[0]],
          },
          price_discount,
          price_sale,
          purchase_url,
          qty: payload.qty,
          shipping_price: payload.shipping_price,
          sku,
          slug: payload.slug,
          title,
          variations,
          weight,
          width,
          height,
          length,
        })
      }
    },
  },
})

export const actions = cartSlice.actions
export default cartSlice
