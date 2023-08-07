import { motion } from 'framer-motion'
import NotFound from 'pages/NotFound'
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { Container } from './styles';

const CategoryPage: React.FC = () => {
  const navigate = useNavigate()

  return <NotFound></NotFound>
}

export default CategoryPage
