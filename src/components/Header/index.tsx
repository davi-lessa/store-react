import React from 'react'

import { AccountBtn, Advice, CartBtn, Container, Content, LeftSide, RightSide } from './styles'
import { Link, useNavigate } from 'react-router-dom'
import Balancer from 'react-wrap-balancer'
import { GiBeard as Logo } from 'react-icons/gi'
import { RiShoppingCart2Line as CartIcon, RiAccountCircleLine as AccountIcon } from 'react-icons/ri'
import { actions as cartActions } from 'store/reducers/cart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { AuthStorage } from 'store/reducers/auth'

interface HeaderProps {
  borderColor?: string
}

const Header: React.FC<HeaderProps> = ({ borderColor }: HeaderProps) => {
  const dispatch = useDispatch()
  const authSelector: AuthStorage = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  function getUser() {
    try {
      return JSON.parse(authSelector.user)
    } catch (error) {
      null
    }
  }

  const user = getUser()

  function goAccount() {
    if (user) navigate('/account')
    else navigate('/auth')
  }

  return (
    <>
      <Advice>
        <Balancer>FRETE GRÁTIS A PARTIR DE 2 UNIDADES PARA SALVADOR</Balancer>
      </Advice>

      <Container>
        <Content>
          <LeftSide>
            <Logo size={24}></Logo>
            <Link to={'/'}>
              <h1>MINOX 247</h1>
            </Link>
          </LeftSide>

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
    </>
  )
}

export default Header
