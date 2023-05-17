/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react'

import { Description, PictureBox, ProductContainer, ProductContent, ProductMarginHolder, Selling } from './styles'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest, apiRoutes } from 'api'

// Icons
import { BiCheck as CheckIcon } from 'react-icons/bi'
import { ReactComponent as VisaIcon } from 'assets/img/card_visa.svg'
import { ReactComponent as MasterIcon } from 'assets/img/card_master.svg'
import { ReactComponent as EloIcon } from 'assets/img/card_elo.svg'
import { ReactComponent as AmexIcon } from 'assets/img/card_amex.svg'
import { ReactComponent as BoletoIcon } from 'assets/img/boleto.svg'
import { List } from 'react-content-loader'

import './remaining_css.css'
import 'swiper/swiper.min.css'
import { generalSettings } from 'settings'
import { ProductItem } from 'types/product.item'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { preloadNext } from 'utils/swiper.preload'
import { motion } from 'framer-motion'

import { ExpectedAddPayload, actions as cartActions } from 'store/reducers/cart'
import { useDispatch } from 'react-redux'
import Accordion from 'components/Accordion'

interface ProductAPIResponse {
  data: ProductItem[]
  geo: {
    city: string
    region: string
    regionCode: string
  }
  meta: any
}

interface VariationOptions {
  optionId: number
  optionValue: string
  varIndex: number
}

const ProductPage: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productReviews = useRef<HTMLElement>(null)
  const lastScrollPos = useRef(0)
  const sellBoxRef = useRef<HTMLDivElement>(null)
  const sellingRef = useRef<HTMLDivElement>(null)
  const selectQtyRef = useRef<HTMLSelectElement>(null)
  const carouselRef = useRef<any>(null)
  const imagePreviewRef = useRef<HTMLImageElement>(null)
  const [selectedVariation, setSelectedVariation] = useState<{ [variationId: string]: VariationOptions }>({})

  const slug: string | undefined = params.slug

  const { data: productData } = useQuery(
    'product-' + params?.slug,
    async () => {
      if (!slug) return navigate('/', { replace: true })

      const req = await apiRequest.get<ProductAPIResponse>(apiRoutes.productBySlug(slug))
      return req.data
    },
    { staleTime: 10 * 1000 * 60 }
  )

  const fetchedProduct = productData && productData.data[0]

  useEffect(() => {
    const handleScroll = () => {
      if (!sellingRef.current || !sellBoxRef.current) return
      const pgY = window.scrollY
      if (pgY > sellingRef.current.offsetHeight - window.innerHeight + sellingRef.current.offsetTop) {
        sellBoxRef.current?.scroll(0, sellBoxRef.current?.offsetHeight + 500)
      }
      if (pgY < sellingRef.current.offsetTop) return sellBoxRef.current?.scroll(0, 0)
      if (lastScrollPos.current < pgY) sellBoxRef.current?.scroll(0, sellBoxRef.current?.scrollTop + 15)
      else if (lastScrollPos.current > pgY) sellBoxRef.current?.scroll(0, sellBoxRef.current?.scrollTop - 25)
      lastScrollPos.current = pgY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setDefaultVariaton()
  }, [productData])

  useEffect(() => {
    const sku = getSelectedVariationSKU()
    const skuImage = sku?.images?.data?.[0]?.medium?.url
    skuImage && imagePreviewRef.current && (imagePreviewRef.current.src = skuImage)
    const imagePreviewEl: HTMLImageElement | null | undefined = imagePreviewRef.current?.closest('.image-preview')
    imagePreviewEl && imagePreviewEl.classList.add('permanent')
  }, [selectedVariation])

  function setDefaultVariaton() {
    if (fetchedProduct && !Object.keys(selectedVariation).length) {
      const newVariation: { [key: string]: VariationOptions } = {}
      productData.data[0].variations.data.forEach(
        (variation, varIndex) =>
          (newVariation[String(variation.id)] = { optionId: variation.values.data[0].id, optionValue: variation.values.data[0].value, varIndex })
      )
      setSelectedVariation(newVariation)
    }
  }

  if (!fetchedProduct)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ height: '100%', padding: '25px', background: '#f2f3f5' }}
      >
        <ProductContainer>
          <ProductMarginHolder style={{ height: '100%' }}>
            <ProductContent style={{ height: '100%', padding: '25px' }}>
              <List></List>
            </ProductContent>
          </ProductMarginHolder>
        </ProductContainer>
      </motion.div>
    )

  const currentSKU = getSelectedVariationSKU()

  const carouselNavigate = (num: number) => carouselRef?.current?.slideTo(num)
  const imagePreviewSet = (url: string) => imagePreviewRef?.current && (imagePreviewRef.current.src = url)

  function getSelectedVariationSKU(): ProductAPIResponse['data'][0]['skus']['data'][0] | null {
    try {
      if (!fetchedProduct) return null
      const selectedVariationLength = Object.keys(selectedVariation).length
      const hasSingleVariations = fetchedProduct?.variations?.data?.every((variation) => variation.values.data.length === 1)

      if (hasSingleVariations) return productData.data[0].skus.data[0]
      if (selectedVariationLength < fetchedProduct?.variations?.data?.length) return null

      const combination = Object.entries(selectedVariation)
        .sort(([e1Key, e1Value], [e2Key, e2Value]) => {
          return e1Value.varIndex - e2Value.varIndex
        })
        .reduce((acc, cur) => {
          const pre = acc ? acc + '-' : ''
          return pre + cur[1].optionId
        }, '')

      return productData.data[0].skus.data.find((sku) => sku.combinations === combination) || null
    } catch (error) {
      console.warn("Couldn't get current sku", error)
      return null
    }
  }

  function addToCart() {
    const currSKU = getSelectedVariationSKU()
    if (!currSKU || !fetchedProduct || !selectQtyRef.current) return
    const qty = selectQtyRef.current?.selectedIndex + 1 || 1

    const itemToCart: ExpectedAddPayload = { ...fetchedProduct, qty, skus: { data: [currSKU] } }
    dispatch(cartActions.addItem(itemToCart))
    dispatch(cartActions.setCartOpen())
  }

  const totalRate = Object.entries(fetchedProduct.reviews).reduce((a, b) => {
    const [bKey, bValue] = b
    return a + bValue * Number(bKey)
  }, 0)
  const avgReviews = Number((totalRate / fetchedProduct.extras?.data?.total_reviews || 0)?.toFixed(1))

  function generateRatingStars(productItem: ProductAPIResponse['data'][0]) {
    if (fetchedProduct?.extras?.data?.total_reviews == 0) return ''
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div
        className="sell-box-stars"
        onClick={() => {
          const productReviewsTitle = productReviews.current?.querySelector('h2')
          productReviewsTitle && window?.scroll(0, productReviewsTitle.offsetTop - 15)
        }}
      >
        <div className="stars">
          {Array.from({ length: Math.floor(avgReviews) }, (_, i) => (
            <div key={'rev-star' + i} className="star"></div>
          ))}
          {Number(avgReviews?.toFixed(2).split('.')[1]) > 0 ? <div key="rev-half-star" className="half-star"></div> : ''}
          {avgReviews < 5 ? Array.from({ length: Math.floor(5 - avgReviews) }, () => <div key="rev-empty-star" className="empty-star"></div>) : ''}
        </div>
        <span className="rate-qty-full">
          <span className="rate-qty">{productItem?.extras?.data?.total_reviews}</span>{' '}
          {productItem?.extras?.data?.total_reviews > 1 ? 'avaliações' : 'avaliação'}
        </span>
      </div>
    )
  }

  function variationsFormat(productItem: ProductAPIResponse['data'][0]) {
    return productItem?.variations.data.map((variation, varIndex) => {
      return (
        <li key={'variation-' + variation.id}>
          <div className="variation_box" data-varid={variation?.id} data-varname={variation?.name}>
            <div className="selected-option">
              <span>{variation?.name}:</span>
              <span className="selected-name"> {selectedVariation?.[String(variation.id)]?.optionValue || 'Escolha'}</span>
            </div>
            <ul className="var-options" data-vargroup={variation?.id}>
              {variation?.values.data.map((option) => (
                <li
                  key={'var-option-' + option.id}
                  className={selectedVariation?.[variation.id]?.optionId === option.id ? 'selected' : ''}
                  onClick={() => {
                    setSelectedVariation((current) => ({ ...current, [variation.id]: { optionId: option.id, optionValue: option.value, varIndex } }))
                  }}
                >
                  <span>{option?.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      )
    })
  }

  const generatePaymentConditions = (
    value: number,
    maxParcels: number = generalSettings.payment_parcels_max,
    taxFreeParcelsCount: number = generalSettings.payment_parcels_no_tax_count
  ) => {
    //                //2x    3x    4x ...
    const mlTaxes = [1.0764, 1.0923, 1.1086, 1.1231, 1.1365, 1.1472, 1.1623, 1.1769, 1.1865, 1.2012, 1.2161]
    return (
      <>
        {Array.from({ length: maxParcels }, (_, i) => {
          const isTaxFree = i < taxFreeParcelsCount ? true : false
          const parcel = isTaxFree
            ? (Math?.floor((value * 100) / (i + 1)) / 100)?.toFixed(2)?.replace('.', ',')
            : (Math.round((Math.round(value * mlTaxes[i - 1] * 100) / 100 / (i + 1)) * 100) / 100).toFixed(2).replace('.', ',')

          return (
            <span className="parcel-wrapper" key={'parcel-condition-' + i}>
              <span className="parcel-count">{i + 1}x</span> <span className="separator"></span>
              <span className="parcel-price">
                R$ {parcel}
                {isTaxFree ? ' s/ juros' : ''}
              </span>
            </span>
          )
        })}
      </>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="product-handler">
      <ProductContainer>
        <ProductMarginHolder>
          <ProductContent>
            <div className="pictures">
              <PictureBox>
                <div className="roller">
                  <ul className="scroller thin lighter">
                    {fetchedProduct.images.data.map((img, index) => {
                      return (
                        <li
                          key={'thumb-' + img.id}
                          data-index={index}
                          className={index === 0 ? 'active' : ''}
                          onClick={(e) => {
                            e.currentTarget
                              .closest('ul')
                              ?.querySelectorAll('li')
                              .forEach((li) => li.classList.remove('active'))
                            e.currentTarget.classList.add('active')
                            imagePreviewRef?.current?.closest('.image-preview')?.classList?.remove('permanent')

                            carouselNavigate(index)
                          }}
                          onMouseEnter={() => window.innerWidth > 922 && imagePreviewSet(img.medium.url)}
                          onMouseLeave={() => imagePreviewRef?.current?.closest('.image-preview')?.classList?.remove('permanent')}
                        >
                          <img draggable="false" src={img?.small?.url} alt="" />
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div className="img-carousel">
                  <div className="image-preview">
                    <img src={fetchedProduct.images.data[0].medium.url} alt="main preview" draggable={false} ref={imagePreviewRef} />
                  </div>

                  <Swiper
                    modules={[Pagination]}
                    onSlideChange={(s) => preloadNext(s, 1)}
                    className="swp-main-images"
                    pagination={{ dynamicBullets: true }}
                    onSwiper={(swiper) => (carouselRef.current = swiper)}
                  >
                    {fetchedProduct.images.data.map((img) => {
                      return (
                        <SwiperSlide key={'swp-main-slider-' + img.id}>
                          <img src={img.medium.url} alt="" loading="lazy" />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </PictureBox>
            </div>

            <Selling ref={sellingRef}>
              <div className="sell-box scroller hidden-scroll" ref={sellBoxRef}>
                <div className="sell-box-qty-selled">
                  <span>Novo</span>
                </div>

                <div className="sell-box-title">
                  <h1>{fetchedProduct.name}</h1>
                </div>

                <div className="sell-box-flags">
                  {currentSKU?.price_sale && currentSKU.price_sale / currentSKU?.price_discount > 1 ? (
                    <span className="flag discount">{Math.floor(Math.abs(currentSKU?.price_discount / currentSKU?.price_sale - 1) * 100)} % OFF</span>
                  ) : (
                    ''
                  )}
                  <span className="flag" style={{ background: '#3483fa' }}>
                    OFERTA DO DIA
                  </span>
                  <span className="flag" style={{ background: '#00a650' }}>
                    FRETE GRÁTIS
                  </span>
                </div>

                {generateRatingStars(fetchedProduct)}

                <div className="sell-box-old-price">
                  <span style={{ textDecoration: 'line-through' }}>R$ {currentSKU?.price_sale?.toFixed(2)?.replace('.', ',')}</span>
                </div>

                <div className="sell-box-price">
                  <h2>
                    R$ {String(currentSKU?.price_discount)?.split('.')?.[0]}
                    <sup>{String(currentSKU?.price_discount)?.split('.')?.[1]?.padEnd(2, '0') || '00'}</sup>
                  </h2>
                </div>

                <div className="sell-box-parcel-max">
                  <span>à vista ou </span>
                  <span style={{ color: '#00a650' }}>12x de R$ 19,98</span>
                  <span>*</span>
                </div>

                <div className="variations">
                  <ul>{variationsFormat(fetchedProduct)}</ul>
                </div>

                <div className="sell-box-sell-box">
                  <div className="input-holder-sbs">
                    <select id="quantity" style={{ border: '1px solid #ddd', borderRadius: '4px' }} ref={selectQtyRef}>
                      {Array.from({ length: generalSettings.max_cart_items }, (_, i) => (
                        <option key={'qty-option-' + i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <button className="hoverable">Comprar agora</button>
                  </div>
                  <button
                    className="hoverable"
                    id="addToCartBtn"
                    style={{ background: 'rgba(65,137,230,.15)', color: '#3483fa', width: '100%', marginTop: '8px' }}
                    onClick={addToCart}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>

                <div className="sell-box-payment-conditions">
                  <p style={{ color: '#3483fa', marginBottom: '4px' }}>Pagamento seguro</p>

                  <Accordion
                    data={[
                      [
                        <>
                          <ul className="bandeiras">
                            <li>
                              <VisaIcon />
                            </li>
                            <li>
                              <MasterIcon />
                            </li>
                            <li>
                              <EloIcon />
                            </li>
                            <li>
                              <AmexIcon />
                            </li>
                          </ul>
                          <span>Ver parcelas</span>
                        </>,
                        <div key={'accord-panel'}>{generatePaymentConditions(Number(currentSKU?.price_discount))}</div>,
                        { groupName: 'parcelas', buttonClass: 'parcelas-accord', panelClass: 'parcelsgroup', arrowRight: true },
                      ],
                    ]}
                  ></Accordion>

                  <button className="dlv_accord boleto-accord no-arrow" data-group="parcelas">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <BoletoIcon />
                      Boleto
                    </span>
                    <span>R$ {currentSKU?.price_discount?.toFixed(2)?.replace('.', ',')}</span>
                  </button>
                </div>

                {/* {shippingBlock} */}

                <div className="sell-box-shipping-calc">
                  <span className="block-title">Calcular frete</span>
                  <div className="input-holder-sbs cep-holder">
                    <input type="tel" className="freight-input" placeholder={localStorage.getItem('cep') ?? 'CEP'} id="cepInput" />
                    <button className="freight-button hoverable">Calcular</button>
                  </div>
                  <div className="cep-result" hidden></div>
                </div>
                <div className="sell-box-warranties">
                  <ul style={{ marginTop: '20px' }}>
                    <li>
                      <span style={{ color: '#3483fa' }}>
                        <CheckIcon />
                        Devolução grátis
                      </span>
                      <p>Se você não gostou ou teve algum problema, garantimos a troca ou reembolso dentro de 7 dias.</p>
                    </li>
                    <li>
                      <span style={{ color: '#3483fa' }}>
                        <CheckIcon />
                        Compra garantida
                      </span>
                      <p>Receba o produto que está esperando ou devolvemos o seu dinheiro.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Selling>

            <Description>
              <div
                className="html-desc"
                dangerouslySetInnerHTML={{
                  __html: fetchedProduct.texts?.data?.description.replace(
                    /<img[^>]* src="([^"]*)"[^>]*>/g,
                    (match, g1) => `<img src=${g1} alt="" loading="lazy" />`
                  ),
                }}
              ></div>
              {/* {specs} */}
              <div className="html-sizes">
                <ul></ul>
              </div>
            </Description>
          </ProductContent>
        </ProductMarginHolder>
      </ProductContainer>
    </motion.div>
  )
}

export default ProductPage
