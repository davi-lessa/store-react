import { signOut } from 'firebase/auth'
import { store } from 'store'
import { auth } from 'services/firebaseConfig'
import { actions as authActions } from 'store/reducers/auth'
import { customerRequest, customerRoutes } from 'api'

export default async function logout() {
  try {
    sessionStorage.removeItem('last_ct_auth')
    await signOut(auth)
    customerRequest.post(customerRoutes.logoff, {}, { timeout: 4000 })
    store.dispatch(authActions.logout())
  } catch (error) {
    store.dispatch(authActions.logout())
    console.warn('Error in logout')
  }
}
