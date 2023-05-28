import React, { useState } from 'react'
import { auth } from 'services/firebaseConfig'
import { signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from 'firebase/auth'
import { actions as authActions } from 'store/reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from 'store'
import { ButtonsWrapper, Container, InputWrapper, LoginButton, LoginWrapper } from './styles'
import { FcGoogle as IconGoogle } from 'react-icons/fc'
import { motion } from 'framer-motion'

const provider = new GoogleAuthProvider()

const LoginPage: React.FC = () => {
  const dispatch = useDispatch()
  const isLogged = useSelector((current: RootState) => current.auth.isLogged)

  const [userMail, setMail] = useState(localStorage.getItem('signMail') || null)

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
        dispatch(authActions.logout())
        // const errorCode = error.code
        // const errorMessage = error.message
        // const email = error.customData.email
        // const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  function signInWithEmail() {
    if (!userMail) return
    sendSignInLinkToEmail(auth, userMail, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('disposableMail', userMail)
      })
      .catch((error) => {
        // const errorCode = error.code
        // const errorMessage = error.message
      })
  }

  const actionCodeSettings = {
    url: window.location.protocol + '//' + window.location.hostname + '/auth/mail-verify',
    handleCodeInApp: true,
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', background: '#f2f3f5' }}>
      <Container>
        <LoginWrapper>
          <h2 className="mb-20">Entre na sua conta</h2>

          <InputWrapper className="mb-20">
            <label htmlFor="mail_provider">Insira o seu e-mail</label>
            <input
              id="mailProvider"
              type="text"
              placeholder="seu@email.com"
              onChange={(e) => setMail(e.currentTarget.value)}
              defaultValue={userMail || ''}
            />
          </InputWrapper>
          <LoginButton onClick={signInWithEmail} className="facebook">
            Receber acesso via e-mail
          </LoginButton>

          <p className="mt-20 mb-20" style={{ textAlign: 'center' }}>
            ou
          </p>
          <ButtonsWrapper>
            <LoginButton onClick={signInWithGoogle}>
              <IconGoogle size={22} />
              Continuar com Google
            </LoginButton>

            {/* <LoginButton onClick={signInWithGoogle} className="facebook">
              <IconFacebook size={22} color="white" />
              Continuar com Facebook
            </LoginButton> */}
          </ButtonsWrapper>
          {/* <p>Dúvidas no acesso?</p> */}
        </LoginWrapper>
      </Container>
    </motion.div>
  )
}

export default LoginPage
