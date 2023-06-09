// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { store } from 'store'
import { actions as authActions } from 'store/reducers/auth'
import customerAuth from 'utils/customer.auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBZ_zEBqhvB1gFIDZQjoj9yP_ZrNq8hDDs',
  authDomain: 'dsvcloud.firebaseapp.com',
  projectId: 'dsvcloud',
  storageBucket: 'dsvcloud.appspot.com',
  messagingSenderId: '202184341400',
  appId: '1:202184341400:web:15d8be364c304ad7ed5ded',
  measurementId: 'G-WE72LQXL8W',
}

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig)
export default fbApp
const auth = getAuth(fbApp)
auth.languageCode = 'pt-BR'

onAuthStateChanged(auth, async (user) => {
  try {
    console.warn('Auth state changed')

    if (!user) return store.dispatch(authActions.logout())
    const { uid, email, displayName, photoURL } = user

    const currentUserInfo = JSON.parse(store.getState().auth.user) || {}
    const idToken = await auth.currentUser?.getIdToken()
    if (!idToken) throw new Error('idToken fail')

    const userDataString = JSON.stringify({ ...currentUserInfo, ...{ uid, email, displayName, photoURL } })

    const storeAuth = store.getState().auth
    if (idToken && (!storeAuth.ct || Date.now() - Number(storeAuth.last_ct) > 1 * 30 * 60 * 1000)) customerAuth(idToken)

    store.dispatch(authActions.fbUpdateLoggedUser({ user: userDataString, token: idToken }))
  } catch (error) {
    store.dispatch(authActions.logout())
    console.error('Failed to set current auth state')
  }
})

export { auth }
