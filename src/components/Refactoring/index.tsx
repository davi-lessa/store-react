import { motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Refactoring: React.FC = () => {
  const redirect = useNavigate()

  return (
    <>
      <motion.div
        style={{ padding: '50px 7%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
        key={Math.random()}
      >
        <h2 style={{ marginBottom: '10px' }}>Esta página ainda está sendo refatorada.</h2>
        <p style={{ marginBottom: '15px' }}>Obrigado pela compreensão.</p>
        <button className="button" style={{ height: '35px' }} onClick={() => redirect(-1)}>
          Voltar
        </button>
      </motion.div>
    </>
  )
}

export default Refactoring
