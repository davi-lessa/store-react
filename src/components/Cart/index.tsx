/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react'

import { CartContainer } from './styles'
import { RiShoppingCart2Line as CartIcon, RiCloseFill as CloseIcon, RiShoppingBag3Line as BagIcon } from 'react-icons/ri'
import { HiPlusSm as PlusIcon, HiMinusSm as MinusIcon } from 'react-icons/hi'
import Balancer from 'react-wrap-balancer'

// import { useQuery } from 'react-query'
// import axios from 'axios'

import { RootState } from 'store'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { ProductItem } from 'types/product.item'
import { actions as cartActions } from 'store/reducers/cart'
import { ExpectedCartItem } from 'types/cart-expected-product'
// import { useNavigate } from 'react-router-dom'
import { getBuyLink } from 'utils/cart'
import { apiRequest, apiRoutes } from 'api'
import { useQuery } from 'react-query'

const Cart: React.FC = () => {
  const cartContainer = useRef<HTMLDivElement>(null)
  const productsContainer = useRef<HTMLDivElement>(null)

  const cartData = useSelector((state: RootState) => state.cart, shallowEqual)
  const dispatch = useDispatch()

  interface CartCheckAPIResponse {
    data: ExpectedCartItem[]
  }

  const { data: cartChecked } = useQuery(
    'cart-check-' + cartData.items.map((i) => i.product_id + i.id).join('-'),
    async () => {
      const skuIdsQuery = cartData.items.map((i) => i.id)
      const productIdsQuery = cartData.items.map((i) => i.product_id)

      const req = await apiRequest.get<CartCheckAPIResponse>(
        apiRoutes.cartCheck + '?sku_ids=' + encodeURI(JSON.stringify(skuIdsQuery)) + '&product_ids=' + encodeURI(JSON.stringify(productIdsQuery))
      )
      const res = req.data
      return res
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 3 * 1000 * 60,
      enabled: !!cartData.items.length,
    }
  )

  useEffect(() => {
    if (!cartChecked?.data?.length) return
    dispatch(cartActions.updateItems(cartChecked?.data))
  }, [cartChecked])

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

  const generateCheckoutURL = (data: typeof cartData) => {
    if (!data?.items?.length) return null
    return data.items.map((item) => item.purchase_url + ':' + item.qty).join(',')
  }

  const calculations = doCalculations()

  function doCalculations() {
    const getFinalPrice = () => {
      const total = cartData.items.reduce((acc, item) => {
        return acc + Number(item?.price_discount) * item?.qty
      }, 0)
      return total.toFixed(2).padEnd(2, '0')
    }

    const getPriceWithoutDiscounts = () => {
      const total = cartData.items.reduce((acc, item) => {
        return acc + Number(item?.price_sale) * item?.qty
      }, 0)
      return total.toFixed(2).padEnd(2, '0')
    }

    return {
      finalValue: getFinalPrice().replace('.', ','),
      subtotal: getPriceWithoutDiscounts().replace('.', ','),
      discounts: (Number(getPriceWithoutDiscounts()) - Number(getFinalPrice())).toFixed(2).padEnd(2, '0').replace('.', ','),
    }
  }

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
                <span className="item-shipping">Envio: a calcular</span>
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
      <div className="calculations-wrapper" key={(() => Math.random())()}>
        <div className="cb-subtotals">
          <span>Subtotal:</span>
          <span className="value">R$ {calculations.subtotal}</span>
        </div>

        <div className="cb-discount">
          <span>Descontos:</span>
          <span className="value">- R${calculations.discounts}</span>
        </div>

        <div className="cb-freight">
          <span>Frete:</span>
          <span className="value">
            <Balancer>A calcular</Balancer>
          </span>
        </div>

        <hr />

        <div className="cb-totals">
          <span>Total:</span>
          <span className="value">R$ {calculations.finalValue}</span>
        </div>
      </div>

      {continueShoppingBtn()}

      <button
        id="goCheckout"
        className="hoverable"
        onClick={() => {
          const buyLink = getBuyLink()
          buyLink && (window.location.href = buyLink)
        }}
      >
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
