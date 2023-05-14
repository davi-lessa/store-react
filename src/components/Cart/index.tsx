/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react'

import { CartContainer } from './styles'
import { RiShoppingCart2Line as CartIcon, RiCloseFill as CloseIcon, RiShoppingBag3Line as BagIcon } from 'react-icons/ri'
import { HiPlusSm as PlusIcon, HiMinusSm as MinusIcon } from 'react-icons/hi'
import Balancer from 'react-wrap-balancer'

import { useQuery } from 'react-query'
import axios from 'axios'

import { RootState } from 'store'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ProductItem } from 'types/product.item'
import { actions as cartActions } from 'store/reducers/cart'
import { ExpectedCartItem } from 'types/cart-expected-product'

const Cart: React.FC = () => {
  const cartContainer = useRef<HTMLDivElement>(null)
  const productsContainer = useRef<HTMLDivElement>(null)

  const cartData = useSelector((state: RootState) => state.cart, shallowEqual)
  const dispatch = useDispatch()

  // const { data, isFetching, refetch } = useQuery(
  //   'prices',
  //   async () => {
  //     console.log('Fetched')
  //     const req = await axios.get('https://tests.gdsv.workers.dev/time')
  //     const res = req.data
  //     return res
  //   },
  //   {
  //     refetchOnWindowFocus: true,
  //     staleTime: 1000,
  //   }
  // )

  // useEffect(() => console.log(data), [data])

  function addToCart(item: ProductItem, qty: number) {
    dispatch(cartActions.addItem({ ...item, qty }))
  }

  function removeFromCart(itemEl: HTMLElement | null, itemId: number) {
    if (!itemEl) return
    // Remove
    itemEl.style.right = '111%'
    itemEl.style.height = itemEl.offsetHeight + 'px'
    itemEl.offsetHeight
    itemEl.style.height = '0px'
    itemEl.style.paddingBottom = '0px'
    itemEl.style.marginBottom = '-1px'
    setTimeout(() => dispatch(cartActions.removeItem({ itemId })), 750)
  }

  useEffect(() => {
    if (cartData.isCartOpen) {
      cartContainer.current?.classList.add('open')
      document?.body?.classList?.add('locked')
    } else {
      cartContainer.current?.classList.remove('open')
      document?.body?.classList?.remove('locked')

      productsContainer.current?.classList.add('loading-ph')
      setTimeout(() => productsContainer?.current?.classList.remove('loading-ph'), 300)
    }
  }, [cartData.isCartOpen])

  function toggleOpen(e: React.MouseEvent, { forceLock = false }: { forceLock?: boolean } = {}) {
    // REMEMBER TO CLOSE MOBILE LEFT CAT MENU if ($('#categories').classList.contains('show')) $('.menu-toggler').click()

    if (cartData.isCartOpen) dispatch(cartActions.setCartClosed())
    else dispatch(cartActions.setCartOpen())
  }

  const continueShoppingBtn = () => (
    <button id="continueShop" className="hoverable" onClick={toggleOpen}>
      Continuar comprando
    </button>
  )

  const emptyCartTemplate = () => (
    <div className="empty-cart">
      <BagIcon color="#aaa" size={72}></BagIcon>
      <br />
      <h3>Sua sacola está vazia</h3>
      <br />
      <p style={{ lineHeight: '150%', padding: '0 25px' }}>
        <Balancer>Adicione produtos à sua sacola e volte novamente</Balancer>
      </p>
      <br />
      <br />
      {continueShoppingBtn()}
    </div>
  )

  const productList = () => {
    const formatVariations = (item: ExpectedCartItem) => (
      <ul>
        {item?.variations?.map((variation, varIndex) => {
          return (
            <li key={variation.value_id} className="cb-item-variation">
              {variation.name}: <strong>{variation.value}</strong>
              {varIndex + 1 < item?.variations?.length ? ' / ' : ''}
            </li>
          )
        })}
      </ul>
    )

    return (
      <ul className="products scroller medium squared">
        {cartData.items.map((item) => {
          return (
            <li key={'ci-item' + item.id} className="item" data-id={item?.id || -1}>
              <div className="item-img">
                <img src={item?.images?.data?.[0]?.small?.url || 'https://via.placeholder.com/65'} alt="" draggable="false" />
              </div>

              <div className="item-info">
                <h4 className="item-title">
                  <Balancer>{item?.title}</Balancer>
                </h4>
                {item?.variations?.length ? formatVariations(item) : ''}

                <span className="item-old-price">
                  {item?.price_sale / item?.price_discount > 1 ? <span>R$ {item?.price_sale.toFixed(2).replace('.', ',')}</span> : ''}
                  {item?.price_sale / item?.price_discount > 1 ? (
                    <span> -{Math.floor(Math.abs(item?.price_discount / item?.price_sale - 1) * 100)} %</span>
                  ) : (
                    ''
                  )}
                </span>
                <span className="item-price">R$ {item?.price_discount.toFixed(2).replace('.', ',')}</span>
                <span className="item-shipping">Frete: A calcular</span>
                <div className="qty-holder">
                  <button className="cb-qtybtn minus hoverable" onClick={() => dispatch(cartActions.removeQty({ itemId: item.id, qtyToChange: 1 }))}>
                    <MinusIcon size={15}></MinusIcon>
                  </button>
                  <span className="qty-indicator" data-qty={item?.qty || 1}>
                    {item?.qty || 1}
                  </span>
                  <button className="cb-qtybtn plus hoverable" onClick={() => dispatch(cartActions.addQty({ itemId: item.id, qtyToChange: 1 }))}>
                    <PlusIcon size={16}></PlusIcon>
                  </button>
                </div>
              </div>
              <button className="item-remove-btn" onClick={(e: React.MouseEvent) => removeFromCart(e.currentTarget.closest('li.item'), item.id)}>
                <CloseIcon size={15} />
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  const footer = () => (
    <div className="cb-footer scroller medium squared">
      <div className="cb-subtotals">
        <span>Subtotal:</span>
        <span className="value"></span>
      </div>
      <div className="cb-discount">
        <span>Descontos:</span>
        <span className="value"></span>
      </div>
      <div className="cb-freight">
        <span>Frete:</span>
        <span className="value"></span>
      </div>
      <div className="cb-totals">
        <span>Total:</span>
        <span className="value"></span>
      </div>

      {continueShoppingBtn()}

      <button id="goCheckout" className="hoverable">
        Finalizar Compra
      </button>

      <p
        style={{
          fontSize: '.75rem',
          textAlign: 'center',
          marginTop: '10px',
          color: '#333',
        }}
      >
        Cupons podem ser aplicados na próxima etapa.
      </p>
    </div>
  )

  return (
    <CartContainer className={cartData.isCartOpen ? 'open' : ''} ref={cartContainer}>
      <div className="cb-mask" onClick={toggleOpen}></div>

      <div className="cb-content">
        <div className="cb-header">
          <button className="close-btn" onClick={toggleOpen}>
            <CloseIcon size={24} />
          </button>

          <h3>SEUS ITENS</h3>

          <span style={{ width: '32px' }}>
            <CartIcon size={24}></CartIcon>
          </span>
        </div>

        <div className="cb-products" ref={productsContainer}>
          {cartData.items.length > 0 ? productList() : emptyCartTemplate()}
        </div>

        {cartData.items.length > 0 && footer()}
      </div>
    </CartContainer>
  )
}

export default Cart
