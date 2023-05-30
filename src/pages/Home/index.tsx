import React, { useEffect, useRef } from 'react'
import Flickity from 'react-flickity-component'
import 'assets/css/flickity.min.css'
import { Container, SliderProductHolder, SliderContainer, Products } from './styles'
import AnimatedBanner from 'components/AnimatedBanner'

import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import { FeaturedCat } from 'types/featured.cats'
import Balancer from 'react-wrap-balancer'
import { apiRequest, apiRoutes } from 'api'
import { flickityOptions } from 'utils/flickity.options'
import { motion } from 'framer-motion'
import { List } from 'react-content-loader'
import { RootState } from 'store'
import { useSelector } from 'react-redux'

const Home: React.FC = () => {
  const menuCategories = useSelector((state: RootState) => state.common.menuCategories)

  const { data: featuredCatsQuery } = useQuery(
    'featuredCats',
    async () => {
      const req = await apiRequest.get<{ data: FeaturedCat[] }>(apiRoutes.featuredProductsByCat(menuCategories.map((i) => String(i.id))))
      return req.data
    },
    { staleTime: 10 * 60 * 5000, enabled: !!menuCategories.length }
  )

  // Fixing drag and click bug
  const navigate = useNavigate()
  const sliddering = useRef(false)
  const flickityHandler = (e: any) => {
    // let downTimeout: number

    e?._events?.activate.push(() => {
      sliddering.current = false
    })
    e?._events?.select?.push(() => {
      sliddering.current = true
      setTimeout(() => (sliddering.current = false), 800)
    })
  }

  function renderCategories(categories: FeaturedCat[]) {
    const catsTypped: FeaturedCat[] = categories

    const mappedCats = catsTypped.map((category, index) => {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.4 } }}
          exit={{ opacity: 0 }}
          style={{
            minHeight: '300px',
          }}
          key={'featured-' + category.catName}
        >
          <div className="featured-cat">
            <div className="cat-title">
              <h2 className="title">{category?.products?.[0]?.categories?.data?.[0]?.name || category.catName}</h2>
              <a className="see-all show-arrow" href={'/categorias/' + category.catId + '/' + category.catName.split(' ').join('-').toLowerCase()}>
                Ver todos
              </a>
            </div>
            <hr style={{ marginBottom: '10px' }} />

            <Flickity options={{ ...flickityOptions }} className="slider" flickityRef={flickityHandler}>
              {renderProducts(category.products)}
            </Flickity>
          </div>
        </motion.div>
      )
    })

    return <div className="category">{mappedCats}</div>
  }

  function renderProducts(items: FeaturedCat['products']) {
    return items?.map((item) => {
      const discount =
        item?.skus?.data?.[0]?.price_sale / item?.skus.data[0].price_discount > 1
          ? Math.floor(Math.abs(item?.skus?.data?.[0]?.price_discount / item?.skus?.data?.[0]?.price_sale - 1) * 100)
          : null

      const priceSale = Number(item.skus.data[0].price_discount).toFixed(2).split('.')
      const priceOld = Number(item.skus.data[0].price_sale).toFixed(2).replace('.', ',')
      const isFreeShipping = item.shipping_price == '0.00' ? true : false

      return (
        <div className="wrapper" key={'slider-' + item?.skus?.data?.[0]?.sku + item?.slug}>
          <SliderProductHolder
            data-discount={discount ? discount + '% OFF' : null}
            className="product"
            onClick={() => !sliddering.current && navigate('/produto/' + item.slug)}
          >
            <Link to={'/produto/' + item.slug} style={{ pointerEvents: 'none' }} className="img-holder-link">
              <img src={item.firstImage.data.medium.url} alt="" draggable="false" width={1} height={1} style={{ height: '100%', width: '100%' }} />
            </Link>

            <div className="description">
              <Link to={'/produto/' + item.slug}>
                <span className="prod-title">
                  <Balancer>{item.name}</Balancer>
                </span>
              </Link>

              <span className="old-price">{'R$ ' + priceOld}</span>
              <span className="price">
                {'R$ ' + priceSale[0]}
                <sup>{priceSale[1]}</sup>
              </span>

              <span className="monthly-price">
                ou <span>12x de R$ 0,39</span>*
              </span>

              {isFreeShipping ? (
                <span style={{ padding: '0 10px', color: '#00a650', fontWeight: 'bold' }} className="mb10">
                  Frete grátis
                </span>
              ) : (
                ''
              )}
            </div>
          </SliderProductHolder>
        </div>
      )
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key={'main-home'}>
      <Container>
        <AnimatedBanner></AnimatedBanner>

        <Products>
          <SliderContainer>
            {featuredCatsQuery?.data ? (
              renderCategories(featuredCatsQuery.data)
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: '25px',
                  margin: '25px',
                  borderRadius: '15px',
                  background: 'white',
                  minHeight: '500px',
                  display: 'grid',
                  gap: '15px',
                }}
              >
                <h2 style={{ fontSize: '1.75em' }}>Mais vendidos por categoria</h2>
                <List style={{ maxWidth: '300px' }}></List>
                <List style={{ maxWidth: '300px' }}></List>
                <List style={{ maxWidth: '300px' }}></List>
              </motion.div>
            )}
          </SliderContainer>
        </Products>
      </Container>
    </motion.div>
  )
}

export default Home
