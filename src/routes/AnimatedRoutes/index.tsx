import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import PageModel from 'components/DefaultPage'

import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
import Account from 'pages/Account'
import ProductPage from 'pages/Product'
import LoginPage from 'pages/Login'
import PrivateRoutes from 'routes/PrivateRoutes'
import MailVerify from 'pages/Login/MailVerify'
import LogoffRoute from 'pages/Login/Logoff'
import InfoPage from 'pages/Info'

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route path="/" element={<PageModel />}>
        <Route index element={<Home />}></Route>
        <Route path="produto/:slug?" element={<ProductPage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>

        <Route path="politica-de-privacidade" element={<InfoPage slug="privacy" />}></Route>
        <Route path="termos" element={<InfoPage slug="terms" />}></Route>
        <Route path="sorteios" element={<InfoPage slug="rattles" />}></Route>

        <Route element={<PrivateRoutes />}>
          <Route path="minhaconta/:navigate?/:ref?" element={<Account />}></Route>
        </Route>
      </Route>

      <Route path="/auth/mail-verify" element={<MailVerify />}></Route>
      <Route path="/auth/logoff" element={<LogoffRoute />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  )
}

export default AnimatedRoutes
