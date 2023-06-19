import axios, { AxiosError } from 'axios'
import { generalSettings } from 'settings'
import { store } from 'store'
import customerAuth from 'utils/customer.auth'

const apiRequest = axios.create({ baseURL: generalSettings.worker_base_url })

const apiRoutes = {
  productBySlug: (product_slug: string) => `product/${product_slug}`,
  featuredProductsByCat: (cats: string) => `product/featured?cats=${cats}`,
  shippingCalc: 'freight',
  menu: 'menu',
  cartCheck: 'cart-check',
}

const customerRequest = axios.create({ baseURL: generalSettings.store_api_base_url, withCredentials: true })
const customerInterceptor = (res: any) => res
customerRequest.interceptors.response.use(customerInterceptor, async (error: AxiosError) => {
  if (error.response?.status === 401) {
    const tkn = store.getState().auth.token

    const logoff = () => {
      customerRequest.post(customerRoutes.logoff, {})
      return window.location.replace('/auth/logoff')
    }

    if (!tkn) return logoff()
    const reAuth = await customerAuth(tkn)
    if (reAuth) return true
    else window.location.reload()
  }
})

const infoRoutes: { [key: string]: string } = {
  terms: 'info/terms',
  privacy: 'info/privacy',
  faq: 'info/faq',
}

const customerRoutes = {
  auth: 'customer/auth',
  logoff: 'logoff',
  orders: '/api/orders',
  raffles: '/api/raffles',
  orderById: (orderId: string) => '/api/order/' + orderId,
}

export { apiRequest, apiRoutes, customerRequest, customerRoutes, infoRoutes }
