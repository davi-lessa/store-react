import axios from 'axios'
import { generalSettings } from 'settings'

const apiRequest = axios.create({ baseURL: generalSettings.worker_base_url })

const apiRoutes = {
  productBySlug: (product_slug: string) => `product/${product_slug}`,
  featuredProductsByCat: (cats: string) => `product/featured?cats=${cats}`,
  shippingCalc: 'freight',
  menu: 'menu',
  cartCheck: 'cart-check',
}

const customerRequest = axios.create({ baseURL: generalSettings.store_api_base_url, withCredentials: true })

const infoRoutes = {
  terms: 'info/terms',
  privacy: 'info/privacy',
}

const customerRoutes = {
  auth: 'customer/me',
  logoff: 'logoff',
  orders: '/api/orders',
  orderById: (orderId: string) => '/api/order/' + orderId,
}

export { apiRequest, apiRoutes, customerRequest, customerRoutes, infoRoutes }
