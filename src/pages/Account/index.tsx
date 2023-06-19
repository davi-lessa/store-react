import React, { useEffect } from 'react'

import { Container, Content, Header } from './styles'
// import { signOut, getAuth } from 'firebase/auth'
// import { auth } from 'services/firebaseConfig'
// import { useDispatch } from 'react-redux'

// import { actions as authActions } from 'store/reducers/auth'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import AccountNavMenu from 'components/Account/NavMenu'
import Raffles from 'components/Account/Raffles'
import Orders from 'components/Account/Orders'

const Account: React.FC = () => {
  // const dispatch = useDispatch()
  const params = useParams()

  const navigate = params?.navigate
  const component = navigate || 'orders'

  const componentMap = (key: string) => {
    const maps: { [key: string]: any } = {
      pedidos: <Orders key={'cmp-orders'}></Orders>,
      sorteios: <Raffles key={'cmp-rattles'}></Raffles>,
    }
    return maps?.[key] || <Orders key={'cmp-orders'}></Orders>
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ height: '100%', background: 'var(--gray-bluish)' }}>
      <Container>
        <Header>
          <h2>Sua Conta </h2>
        </Header>

        <div className="nav-menu-holder">
          <AccountNavMenu></AccountNavMenu>
        </div>

        <Content>{componentMap(component)}</Content>
      </Container>
    </motion.div>
  )
}

export default Account
