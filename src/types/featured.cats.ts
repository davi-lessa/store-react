export interface FeaturedCat {
  category: string
  products: FeaturedItem[]
}

interface FeaturedItem {
  shipping_price: string
  name: string
  slug: string
  priority: number
  categories: Categories
  skus: Skus
  firstImage: FirstImage
}

interface Categories {
  data: Daum[]
}

interface Daum {
  id: number
  name: string
  parent_id: any
  url_path: string
}

interface Skus {
  data: Daum2[]
}

interface Daum2 {
  sku: string
  blocked_sale: boolean
  title: string
  price_sale: number
  price_discount: number
  purchase_url: string
}

interface FirstImage {
  data: Data
}

interface Data {
  small: Small
  thumb: Thumb
  large: Large
  medium: Medium
}

interface Small {
  width: number
  height: number
  url: string
}

interface Thumb {
  width: number
  height: number
  url: string
}

interface Large {
  width: number
  height: number
  url: string
}

interface Medium {
  width: number
  height: number
  url: string
}
