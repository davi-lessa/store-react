import axios from 'axios'
import { generalSettings } from 'settings'

const apiRequest = axios.create({ baseURL: generalSettings.worker_base_url })

const apiRoutes = {
  productBySlug: (product_slug: string) => `product/${product_slug}`,
  featuredProductsByCat: (cats: string) => `product/featured?cats=${cats}`,
  shippingCalc: 'minoxfreight',
  menu: 'menu',
  cartCheck: 'cart-check',
}

const customerRequest = axios.create({ baseURL: generalSettings.store_api_base_url })

const customerRoutes = {
  auth: 'login',
  logoff: 'logoff',
}

export { apiRequest, apiRoutes, customerRequest, customerRoutes }
