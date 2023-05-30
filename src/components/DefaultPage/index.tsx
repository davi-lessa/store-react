import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container, Content } from './styles'
import Header from 'components/Header'
import Footer from 'components/Footer'

// import Cart from '../Cart'

const PageModel: React.FC = () => {
  return (
    <Container>
      <Header></Header>

      <Content>
        <Outlet></Outlet>
      </Content>

      <Footer></Footer>
    </Container>
  )
}

export default React.memo(PageModel)
