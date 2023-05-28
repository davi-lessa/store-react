import React from 'react'
import { Outlet } from 'react-router-dom'
// import Header from '../Header'

import { Container, Content } from './styles'

// import Cart from '../Cart'

const PageModel: React.FC = () => {
  return (
    <Container>
      <Content>
        <Outlet></Outlet>
      </Content>
    </Container>
  )
}

export default PageModel
