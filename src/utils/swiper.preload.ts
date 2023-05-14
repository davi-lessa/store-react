import Swiper from 'swiper'

export const preloadNext = (swiper: Swiper, n: number) => {
  swiper.slides
    ?.slice(swiper.activeIndex, swiper.activeIndex + n + 1)
    ?.map((slide) => slide.querySelector('img'))
    ?.forEach((s) => s?.setAttribute('loading', 'eager'))
}
