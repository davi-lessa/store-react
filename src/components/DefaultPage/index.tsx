import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container, Main } from './styles'
import Header from 'components/Header'
import Footer from 'components/Footer'

const PageModel: React.FC = () => {
  return (
    <Container>
      <Header></Header>

      <Main>
        <Outlet></Outlet>
      </Main>

      <Footer></Footer>
    </Container>
  )
}

export default React.memo(PageModel)
