import { createSlice, current } from '@reduxjs/toolkit'
// eslint-disable-next-line import/named
import { OAuthCredential } from 'firebase/auth'

export interface AuthStorage {
  user: string
  token: OAuthCredential['accessToken']
  isLogged: boolean
}

const def: AuthStorage = { user: '{}', token: '', isLogged: false }
let initialState = def

const getStoredAuth = () => {
  try {
    const storedAuth = sessionStorage.getItem('mxd_auth')
    const parsedAuth = storedAuth && JSON?.parse(storedAuth)
    if (parsedAuth) initialState = { ...parsedAuth }
  } catch (error) {
    sessionStorage.setItem('mxd_auth', JSON.stringify(def))
    console.warn('Auth violated.')
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
    fbUpdateLoggedUser(currentState, { payload }: { payload: string }) {
      currentState.user = payload
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
