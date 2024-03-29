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
import CategoryPage from 'pages/Category'
import Refactoring from 'components/Refactoring'

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route path="/" element={<PageModel />}>
        <Route index element={<Home />}></Route>
        <Route path="produto/:slug?" element={<ProductPage />}></Route>
        <Route path="categorias/:slug?/:catname?" element={<CategoryPage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>

        <Route path="faq" element={<InfoPage slug="faq" />}></Route>
        <Route path="politica-de-privacidade" element={<InfoPage slug="privacy" />}></Route>
        <Route path="termos-de-uso" element={<InfoPage slug="terms" />}></Route>
        <Route path="sorteios" element={<InfoPage slug="rattles" />}></Route>
        <Route path="sobre-nos" element={<InfoPage slug="about" />}></Route>
        <Route path="rastreamento" element={<Refactoring />}></Route>
        <Route path="atendimento" element={<Refactoring />}></Route>

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
