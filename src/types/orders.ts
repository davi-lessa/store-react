export interface OrderData {
  id: number
  customer_id: number
  status_id: number
  promocode_id: any
  marketplace_id: any
  authorized: boolean
  sync_by_erp: boolean
  has_recomm: boolean
  delivered: boolean
  number: number
  marketplace_partner_id: any
  marketplace_sale_number: any
  value_total: number
  value_products: number
  value_shipment: number
  value_tax: number
  shipment_service: string
  shipment_quote_id: string
  track_code: any
  track_url: any
  days_delivery: number
  date_delivery: DateDelivery
  utm_source: string
  utm_campaign: string
  total_comments: number
  ip: string
  status: Status
  marketplace: Marketplace
  customer: Customer
  items: Items
}

interface DateDelivery {
  date: string
  timezone_type: number
  timezone: string
}

interface Status {
  data: StatusData
}

interface StatusData {
  id: number
  alias: string
  name: string
  description: string
}

interface Marketplace {
  data: any[]
}

interface Customer {
  data: CustomerData
}

interface CustomerData {
  id: number
  marketplace_id: any
  active: boolean
  type: string
  name: string
  razao_social: any
  first_name: string
  last_name: string
  email: string
  cnpj: any
  cpf: string
  phone: Phone
  utm_source: any
  utm_campaign: any
  ip: string
}

interface Phone {
  area_code: string
  number: string
  formated_number: string
}

interface Items {
  data: ItemsData[]
}

interface ItemsData {
  id: number
  product_id: number
  sku_id: number
  price_cost: number
  price: number
  quantity: number
  gift: boolean
  gift_value: number
  has_recomm: number
  custom_value: any
  customizations: Customization[]
  sku: Sku
}

interface Customization {
  id: number
  name: string
  value: string
}

interface Sku {
  data: SKUData
}

interface SKUData {
  id: number
  product_id: number
  sku: string
  erp_id: string
  blocked_sale: boolean
  barcode: string
  title: string
  days_availability: number
  days_availability_formated: string
  width: number
  height: number
  length: number
  weight: number
  quantity_managed: boolean
  variations: Variation[]
  order: number
  total_in_stock: number
}

interface Variation {
  name: string
  value: string
  value_id: number
}
