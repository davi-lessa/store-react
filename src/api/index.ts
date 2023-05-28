import axios from 'axios'

const apiRequest = axios.create({ baseURL: `https://tests.gdsv.workers.dev/api/` })

const apiRoutes = {
  productBySlug: (product_slug: string) => `products?slug=${product_slug}`,
  featuredProductsByCat: (cats: string[]) => `product/featured?cats=${encodeURI(JSON.stringify(cats))}`,
  shippingCalc: 'minoxfreight',
  menu: 'categories/menu',
}

export { apiRequest, apiRoutes }
