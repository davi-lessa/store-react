import { signOut } from 'firebase/auth'
import { store } from 'store'
import { auth } from 'services/firebaseConfig'
import { actions as authActions } from 'store/reducers/auth'
import { customerRequest, customerRoutes } from 'api'

export default function logout() {
  try {
    signOut(auth)
    customerRequest.post(customerRoutes.logoff, {}, { timeout: 20000 })
    sessionStorage.removeItem('last_ct_auth')
    store.dispatch(authActions.logout())
  } catch (error) {
    console.warn('Error in logout')
  }
}
