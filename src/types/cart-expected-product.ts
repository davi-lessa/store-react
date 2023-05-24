export interface ExpectedCartItem {
  availability: number
  allow_sell_without_customization: boolean
  id: number
  price_discount: number
  price_sale: number
  product_id: number
  purchase_url: string
  sku: string
  title: string
  variations: Variation[]
  images: {
    data: ImageData[]
  }
  combinations: string
  customizations: {
    data: Customization[]
  }
  shipping_price: string
  qty: number
  slug: string
  length: number
  width: number
  height: number
  weight: number
}

interface Variation {
  name: string
  id: number
  value: string
  value_id: number
}

interface ImageData {
  id: number
  processed: boolean
  name: string
  order: number
  extension: string
  filter_image_url: null
  small: {
    width: number
    height: number
    url: string
  }
  thumb: {
    width: number
    height: number
    url: string
  }
  medium: {
    width: number
    height: number
    url: string
  }
  large: {
    width: number
    height: number
    url: string
  }
}

interface Customization {
  id: number
  name: string
  price: number
  description: null
  type: string
  required: boolean
  max_chars: number
  total_products: number
  allowed_values: string
  products_ids: number[]
  values: string[]
  created_at: CreatedAt
  updated_at: UpdatedAt
}

interface CreatedAt {
  date: string
  timezone_type: number
  timezone: string
}

interface UpdatedAt {
  date: string
  timezone_type: number
  timezone: string
}
