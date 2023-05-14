import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

import { Container, Content } from './styles'
import Cart from '../Cart'

const PageModel: React.FC = () => {
  return (
    <Container>
      <Header></Header>
      <Content>
        <Outlet></Outlet>
      </Content>
      <Cart></Cart>
    </Container>
  )
}

export default PageModel
