import React from 'react'
import { MenuList } from './styles'

// import { Container } from './styles';

const AccountNavMenu: React.FC = () => {
  return (
    <MenuList>
      <li>Meus pedidos</li>
      <li>Sorteios</li>
      <li>Sair</li>
    </MenuList>
  )
}

export default AccountNavMenu
