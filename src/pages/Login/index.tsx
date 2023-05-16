import React, { useEffect, useRef } from 'react'
import { auth } from 'services/firebaseConfig'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { actions as authActions } from 'store/reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from 'store'

const provider = new GoogleAuthProvider()

const LoginPage: React.FC = () => {
  const dispatch = useDispatch()
  const isLogged = useSelector((current: RootState) => current.auth.isLogged)

  if (isLogged) return <Navigate to={'/'} replace={true}></Navigate>

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        if (token && user) dispatch(authActions.setTokenUser({ token, user: JSON.stringify(user) }))
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>Login com Google</button>
    </div>
  )
}

export default LoginPage
