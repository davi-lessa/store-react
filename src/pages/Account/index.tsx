import React from 'react'

import { Container } from './styles'
import { signOut, getAuth } from 'firebase/auth'
import { auth } from 'services/firebaseConfig'
import { useDispatch } from 'react-redux'

import { actions as authActions } from 'store/reducers/auth'
import { motion } from 'framer-motion'

const Account: React.FC = () => {
  const dispatch = useDispatch()

  function logout() {
    try {
      signOut(auth)
      dispatch(authActions.logout())
    } catch (error) {
      console.warn('Error in logout')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container>
        <h2>SuaConta</h2>
        <button onClick={logout}>Logout</button>
      </Container>
    </motion.div>
  )
}

export default Account
