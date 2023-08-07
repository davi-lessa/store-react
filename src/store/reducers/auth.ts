import { createSlice } from '@reduxjs/toolkit'
// eslint-disable-next-line import/named
import { OAuthCredential } from 'firebase/auth'

export interface AuthStorage {
  user: string
  token: OAuthCredential['accessToken'] | null
  isLogged: boolean
  ct: string | null
  last_ct: number | null
}

const def: AuthStorage = { user: '{}', token: null, isLogged: false, ct: null, last_ct: null }
let initialState = def

const getStoredAuth = () => {
  try {
    const storedAuth = sessionStorage.getItem('mxd_auth')
    const parsedAuth = storedAuth && JSON?.parse(storedAuth)

    if (parsedAuth) initialState = { ...parsedAuth }
  } catch (error) {
    sessionStorage.setItem('mxd_auth', JSON.stringify(def))
    console.warn('Auth violation reported.')
  }
}

const removeStoredAuth = () => {
  sessionStorage.setItem('mxd_auth', JSON.stringify({ ...def }))
}

getStoredAuth()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokenUser(currentState, { payload }: { payload: { token: string; user: string } }) {
      if (!payload.user || !payload.token) return
      currentState.user = payload.user
      currentState.token = payload.token
      currentState.isLogged = true
    },
    setCartToken(currentState, { payload }) {
      currentState.ct = payload
      currentState.last_ct = Date.now()
    },
    unsetCartToken(currentState) {
      currentState.ct = null
      currentState.last_ct = null
    },
    fbUpdateLoggedUser(currentState, { payload }: { payload: { user: string; token: string } }) {
      currentState.user = payload.user
      currentState.token = payload.token
      currentState.isLogged = true
    },
    logout() {
      removeStoredAuth()
      return { ...def, isLogged: false }
    },
  },
})

export default authSlice
export const actions = authSlice.actions
