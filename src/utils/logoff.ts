import { signOut } from 'firebase/auth'
import { store } from 'store'
import { auth } from 'services/firebaseConfig'
import { actions as authActions } from 'store/reducers/auth'

export default function logout() {
  try {
    signOut(auth)
    store.dispatch(authActions.logout())
  } catch (error) {
    console.warn('Error in logout')
  }
}
