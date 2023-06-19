import { customerRequest, customerRoutes } from 'api'
import { store } from 'store'
import { actions as authActions } from 'store/reducers/auth'

export default function customerAuth(tkn: string) {
  return customerRequest.post(customerRoutes.auth, { idToken: tkn }, { timeout: 15000, withCredentials: true }).then((res) => {
    if (res.status != 200) {
      sessionStorage.removeItem('last_ct_auth')
      return false
    } else if (res.status === 200) {
      store.dispatch(authActions.setCartToken(res.data.token))
      return true
    }

    return false
  })
}
