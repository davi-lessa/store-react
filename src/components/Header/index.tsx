import React, { useEffect } from 'react'

import { AccountBtn, Advice, CartBtn, Center, Container, Content, LeftSide, MenuButton, RightSide } from './styles'
import { Link, useNavigate } from 'react-router-dom'
import Balancer from 'react-wrap-balancer'
import { GiBeard as Logo, GiHamburgerMenu as MenuIcon } from 'react-icons/gi'
import { RiShoppingCart2Line as CartIcon, RiAccountCircleLine as AccountIcon } from 'react-icons/ri'
import { actions as cartActions } from 'store/reducers/cart'
import { actions as commonActions } from 'store/reducers/common'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { AuthStorage } from 'store/reducers/auth'
import { useQuery } from 'react-query'
import { apiRequest, apiRoutes } from 'api'
import Categories from './Categories'
import Menu from 'components/Menu'

interface HeaderProps {
  borderColor?: string
}

export interface MenuAPIResponse {
  data: MenuItem[]
  meta: any
}
interface MenuItem {
  featured: boolean
  name: string
  order: number
  slug: string
  id: number
}

const Header: React.FC<HeaderProps> = ({ borderColor }: HeaderProps) => {
  const dispatch = useDispatch()
  const authSelector: AuthStorage = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  const { data: menuItems } = useQuery(
    'menu-items',
    async () => {
      const req = await apiRequest.get<MenuAPIResponse>(apiRoutes.menu)
      const res = req.data
      return res
    },
    { staleTime: 12 * 60 * 1000 * 60 }
  )

  useEffect(() => {
    null
  }, [])

  useEffect(() => {
    menuItems?.data?.length && dispatch(commonActions.setMenuCategories(menuItems.data))
  }, [menuItems])

  function getUser() {
    try {
      return JSON.parse(authSelector.user)
    } catch (error) {
      null
    }
  }

  const user = getUser()

  function goAccount() {
    if (user) navigate('/minhaconta')
    else navigate('/auth')
  }

  function openMenu() {
    dispatch(commonActions.openMenu())
  }

  return (
    <header>
      <Advice>
        <Balancer>FRETE GRÁTIS A PARTIR DE 2 UNIDADES PARA SALVADOR</Balancer>
      </Advice>

      <Container>
        <Content>
          <LeftSide>
            {window.innerWidth <= 922 && (
              <MenuButton onClick={() => menuItems?.data && openMenu()}>
                <MenuIcon size={20} />
              </MenuButton>
            )}

            <Logo size={24}></Logo>
            <Link to={'/'}>
              <h1>MINOX 71</h1>
            </Link>
          </LeftSide>

          <Center></Center>

          <RightSide>
            <AccountBtn onClick={goAccount}>
              <span className="username">{authSelector.isLogged && user?.displayName ? user.displayName?.split(' ')?.[0] : null}</span>
              <AccountIcon size={28}></AccountIcon>
            </AccountBtn>

            <CartBtn onClick={() => dispatch(cartActions.setCartOpen())}>
              <CartIcon size={28}></CartIcon>
            </CartBtn>
          </RightSide>
        </Content>
      </Container>

      <div>
        {menuItems?.data && window.innerWidth > 922 ? (
          <Categories items={menuItems?.data.map((i) => ({ slug: i.slug, name: i.name, catId: i.id }))}></Categories>
        ) : (
          menuItems?.data && (
            <Menu isLogged={authSelector.isLogged} categoryItems={menuItems?.data.map((i) => ({ slug: i.slug, name: i.name, catId: i.id }))}></Menu>
          )
        )}
      </div>
    </header>
  )
}

export default Header
