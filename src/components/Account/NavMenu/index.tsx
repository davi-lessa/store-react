import React from 'react'
import { MenuList } from './styles'
import { Link, useNavigate } from 'react-router-dom'

// import { Container } from './styles';

const AccountNavMenu: React.FC = () => {
  const navigate = useNavigate()

  const menuItems = {
    'minhaconta/pedidos': 'Meus pedidos',
    'minhaconta/sorteios': 'Sorteios',
    'auth/logoff': 'Sair',
  }

  return (
    <MenuList className="page-nav">
      {Object.entries(menuItems).map(([route, label]) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li key={`auth-nav-${route}`} onClick={() => navigate('/' + route, { replace: true })}>
            <span>{label}</span>
          </li>
        )
      })}
    </MenuList>
  )
}

export default AccountNavMenu
