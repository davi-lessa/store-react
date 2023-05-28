export interface ProductItem {
  extras: Extras
  texts: Texts
  seo: Seo
  filters: Filters
  flags: Flags
  variations: Variations
  categories: Categories
  images: Images
  skus: Skus
  combos: Combos
  has_variations: boolean
  is_digital: boolean
  name: string
  shipping_price: string
  slug: string
  id: number
  rating: number
  reviews: Reviews
}

interface Extras {
  data: {
    ncm: any
    google_category: any
    video: string
    facebook_pixel_id: any
    search_terms: any
    total_comments: number
    total_reviews: number
    total_orders: number
    total_in_stock: number
    for_gift: boolean
    use_different_images: boolean
  }
}

interface Texts {
  data: {
    description: string
    specifications: string
    measures: string
  }
}

interface Seo {
  data: {
    seo_title: string
    seo_description: string
    seo_keywords: string
    canonical_url: string
  }
}

interface Filters {
  data: any[]
}

interface Flags {
  data: any[]
}

interface Variations {
  data: {
    id: number
    name: string
    values: Values
  }[]
}

interface Values {
  data: {
    id: number
    value: string
    blocked_sale: number
    color: any
    image_url: any
  }[]
}

interface Categories {
  data: { id: number; name: string; parent_id: any; url_path: string }[]
}

interface Images {
  data: {
    id: number
    processed: boolean
    name: string
    order: number
    extension: string
    filter_image_url: any
    small: Small
    thumb: Thumb
    medium: Medium
    large: Large
  }[]
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

interface Medium {
  width: number
  height: number
  url: string
}

interface Large {
  width: number
  height: number
  url: string
}

interface Skus {
  data: {
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
    images: Images
    combinations: string
    customizations: Customizations
    length: number
    width: number
    height: number
    weight: number
    can_sale: boolean
  }[]
}

interface Variation {
  name: string
  id: number
  value: string
  value_id: number
}

interface Customizations {
  data: {
    id: number
    name: string
    price: number
    description: any
    type: string
    required: boolean
    max_chars: number
    total_products: number
    allowed_values: string
    products_ids: number[]
    values: string[]
    created_at: CreatedAt
    updated_at: UpdatedAt
  }[]
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

interface Combos {
  data: any[]
}

interface Reviews {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
}
