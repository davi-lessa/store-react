import axios from 'axios'

const apiRequest = axios.create({ baseURL: `https://mxd.gdsv.workers.dev/api/` })

const apiRoutes = {
  productBySlug: (product_slug: string) => `product/${product_slug}`,
  featuredProductsByCat: (cats: string[]) => `product/featured?cats=${encodeURI(JSON.stringify(cats))}`,
  shippingCalc: 'minoxfreight',
  menu: 'menu',
  cartCheck: 'cart-check',
}

export { apiRequest, apiRoutes }
