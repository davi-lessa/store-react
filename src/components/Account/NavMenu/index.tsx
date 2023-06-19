import React, { useEffect, useState } from 'react'
import { MenuList } from './styles'
import { useLocation, useNavigate } from 'react-router-dom'

// import { Container } from './styles';

const AccountNavMenu: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentRoute, setCurrentRoute] = useState(location.pathname)

  const menuItems: { [key: string]: string } = {
    'minhaconta/pedidos': 'Meus pedidos',
    'minhaconta/sorteios': 'Sorteios',
    'auth/logoff': 'Sair',
  }

  function navClick(route: string) {
    setCurrentRoute('/' + route)
    navigate('/' + route, { replace: true })
  }

  useEffect(() => {
    const routeExists = Object.keys(menuItems).includes(location?.pathname?.slice(1))
    if (routeExists) setCurrentRoute(location.pathname)
  }, [location.pathname])

  return (
    <MenuList className="page-nav">
      {Object.entries(menuItems).map(([route, label]) => {
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li key={`acc-nav-${route}`} onClick={() => navClick(route)} className={currentRoute === '/' + route ? 'active' : ''}>
            <span>{label}</span>
          </li>
        )
      })}
    </MenuList>
  )
}

export default AccountNavMenu
