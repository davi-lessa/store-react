// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { store } from 'store'
import { actions as authActions } from 'store/reducers/auth'

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

onAuthStateChanged(auth, (user) => {
  try {
    console.log('Auth state changed')
    const currentUserInfo = JSON.parse(store.getState().auth.user)
    const userDataString = JSON.stringify({ ...currentUserInfo, ...user })
    if (user?.uid) store.dispatch(authActions.fbUpdateLoggedUser(userDataString))
    else store.dispatch(authActions.logout())
  } catch (error) {
    console.error('Failed to set current auth state', error)
  }
})

export { auth }
