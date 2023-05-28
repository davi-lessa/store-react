import Categories, { MenuCategoryItem } from 'components/Header/Categories'
import React, { useEffect } from 'react'
import { Container } from './style'

import { RiAccountCircleLine as AccountIcon, RiQuestionLine as QuestionIcon, RiCloseFill as CloseIcon } from 'react-icons/ri'
import { TbClover as LuckyIcon } from 'react-icons/tb'
import { FiPackage as PackageIcon } from 'react-icons/fi'
import { MdOutlineSupportAgent as SupportIcon, MdExitToApp } from 'react-icons/md'

import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { actions as commonActions } from 'store/reducers/common'

interface Props {
  categoryItems: MenuCategoryItem[]
  isLogged: boolean
}

const Menu: React.FC<Props> = ({ categoryItems, isLogged }: Props) => {
  const isMenuOpen = useSelector((state: RootState) => state.common.menuOpen)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (isMenuOpen && location.pathname != '/auth/logoff') dispatch(commonActions.closeMenu())
  }, [location])

  const quickList = [
    { name: 'Meus pedidos', to: '/minhaconta/pedidos', icon: PackageIcon, hideForGuests: true },
    { name: 'Conta', to: '/minhaconta', icon: AccountIcon, nameForGuests: 'Entrar' },
    { name: 'Dúvidas frequentes', to: '/faq', icon: QuestionIcon },
    { name: 'Sorteios', to: '/minhaconta/sorteios', icon: LuckyIcon },
    { name: 'Atendimento', to: '/atendimento', icon: SupportIcon },
    { name: 'Sair', to: '/auth/logoff', icon: MdExitToApp, hideForGuests: true },
  ]

  function closeMenu() {
    dispatch(commonActions.closeMenu())
  }

  function hideForGuestsFilter(i: (typeof quickList)[0]) {
    if (i?.hideForGuests && !isLogged) return false
    return true
  }

  function guestsRemapping(i: (typeof quickList)[0]) {
    return { ...i, name: !isLogged && i.nameForGuests ? i.nameForGuests : i.name }
  }

  return (
    <Container className={isMenuOpen ? 'opened' : 'closed'}>
      <button className="close-btn" onClick={closeMenu}>
        <CloseIcon size={24} />
      </button>
      <h3>Acesso rápido</h3>
      <br></br>

      <div className="category-holder">
        <ul className="top-list">
          {quickList
            .filter(hideForGuestsFilter)
            .map(guestsRemapping)
            .map((i, index) => {
              const Icon = i.icon
              return (
                <li key={'quick-access-' + index}>
                  <Link to={i.to}>
                    <span>
                      <Icon size={24} color="#a2b3c5" />
                      {i.name}
                    </span>
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
      <br />
      <br />

      <h3>Categorias</h3>
      <div className="category-holder">
        <Categories className="cat-list" items={categoryItems}></Categories>
      </div>
    </Container>
  )
}

export default Menu
