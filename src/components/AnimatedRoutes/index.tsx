import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import PageModel from 'components/DefaultPage'
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
import Account from 'pages/Account'
import ProductPage from 'pages/Product'

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route path="/" element={<PageModel />}>
        <Route index element={<Home />}></Route>
        <Route path="account" element={<Account />}></Route>
        <Route path="product/:slug?" element={<ProductPage />}></Route>
      </Route>

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  )
}

export default AnimatedRoutes
