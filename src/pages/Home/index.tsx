import React from 'react'
import { Container, SliderProductHolder, SliderContainer, Products } from './styles'
import AnimatedBanner from 'components/AnimatedBanner'

import 'swiper/swiper.min.css'

import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import { FeaturedCat } from 'types/featured.cats'
import Balancer from 'react-wrap-balancer'
import { apiRequest, apiRoutes } from 'api'
import { motion } from 'framer-motion'
import { List } from 'react-content-loader'
import { RootState } from 'store'
import { useSelector } from 'react-redux'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

const Home: React.FC = () => {
  const menuCategories = useSelector((state: RootState) => state.common.menuCategories)

  const { data: featuredCatsQuery } = useQuery(
    'featuredCats',
    async () => {
      const req = await apiRequest.get<{ data: FeaturedCat[] }>(apiRoutes.featuredProductsByCat(menuCategories.map((mc) => mc.id).join(',')))
      return req.data
    },
    { staleTime: 10 * 60 * 5000, enabled: !!menuCategories.length }
  )

  // Fixing drag and click bug
  const navigate = useNavigate()

  function renderCategories(categories: FeaturedCat[]) {
    const catsTypped: FeaturedCat[] = categories

    const mappedCats = catsTypped.map((category, index) => {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.4 } }}
          exit={{ opacity: 0 }}
          style={{
            minHeight: '350px',
          }}
          key={'featured-' + category.catName}
        >
          <div className="cat-title">
            <h2 className="title">{category?.products?.[0]?.categories?.data?.[0]?.name || category.catName}</h2>
            <a className="see-all show-arrow" href={'/categorias/' + category.catId + '/' + category.catName.split(' ').join('-').toLowerCase()}>
              Ver todos
            </a>
          </div>

          <hr style={{ marginBottom: '10px' }} />

          <Swiper
            className="swp-main-images"
            pagination={{ dynamicBullets: true, clickable: true }}
            modules={[Pagination]}
            slidesPerView={'auto'}
            spaceBetween={15}
            speed={200}
          >
            {renderProducts(category.products)}
          </Swiper>
        </motion.div>
      )
    })

    return <>{mappedCats}</>
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
        <SwiperSlide key={'slider-' + item?.skus?.data?.[0]?.sku + item?.slug} className="slide">
          <SliderProductHolder
            data-discount={discount ? discount + '% OFF' : null}
            className="product"
            onClick={() => navigate('/produto/' + item.slug)}
          >
            <div className="img-holder-link">
              <img src={item.firstImage.data.medium.url} alt="" draggable="false" width={1} height={1} style={{ height: '100%', width: '100%' }} />
            </div>

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
        </SwiperSlide>
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
