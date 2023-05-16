import React from 'react'
import { auth } from 'services/firebaseConfig'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions as authActions } from 'store/reducers/auth'

const MailVerify: React.FC = () => {
  const dispatch = useDispatch()

  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem('disposableMail')
    if (!email) return <Navigate to={'/login'} replace={true} />

    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        window.localStorage.removeItem('disposableMail')
        const user = result.user
        if (user) dispatch(authActions.setTokenUser({ token: '', user: JSON.stringify(user) }))
        return <Navigate to={'/'} replace={true} />
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        dispatch(authActions.logout())
        return <Navigate to={'/login'} replace={true} />
      })
  }

  return <Navigate to={'/login'} replace={true} />
}

export default MailVerify
