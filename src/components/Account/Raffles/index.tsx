import { motion } from 'framer-motion'
import React from 'react'

import { Container } from './styles'

const Raffles: React.FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.25 } }} exit={{ opacity: 0 }}>
      <Container>
        <h2>Sorteios</h2>
        <p>Você ainda não participou de nenhum sorteio.</p>
      </Container>
    </motion.div>
  )
}

export default Raffles
