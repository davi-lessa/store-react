import { motion } from 'framer-motion'
import React from 'react'

import { Container } from './styles'

const Orders: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }}>
      <Container>
        <h2>Pedidos</h2>
        <p>Você ainda não realizou nenhum pedido.</p>
      </Container>
    </motion.div>
  )
}

export default Orders
