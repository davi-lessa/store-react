import * as z from 'zod'

const ImageDataSchema = z.object({
  id: z.number(),
  processed: z.boolean(),
  name: z.string(),
  order: z.number(),
  extension: z.string(),
  filter_image_url: z.null(),
  small: z.object({
    width: z.number(),
    height: z.number(),
    url: z.string(),
  }),
  thumb: z.object({
    width: z.number(),
    height: z.number(),
    url: z.string(),
  }),
  medium: z.object({
    width: z.number(),
    height: z.number(),
    url: z.string(),
  }),
  large: z.object({
    width: z.number(),
    height: z.number(),
    url: z.string(),
  }),
})

const VariationSchema = z.object({
  name: z.string(),
  id: z.number(),
  value: z.string(),
  value_id: z.number(),
})

const CustomizationSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.null(),
  type: z.string(),
  required: z.boolean(),
  max_chars: z.number(),
  total_products: z.number(),
  allowed_values: z.string(),
  products_ids: z.array(z.number()),
  values: z.array(z.string()),
  created_at: z.object({
    date: z.string(),
    timezone_type: z.number(),
    timezone: z.string(),
  }),
  updated_at: z.object({
    date: z.string(),
    timezone_type: z.number(),
    timezone: z.string(),
  }),
})

const ItemSchema = z.object({
  availability: z.number(),
  allow_sell_without_customization: z.boolean(),
  id: z.number(),
  price_discount: z.number(),
  price_sale: z.number(),
  product_id: z.number(),
  purchase_url: z.string(),
  sku: z.string(),
  title: z.string(),
  variations: z.array(VariationSchema),
  images: z.object({
    data: z.array(ImageDataSchema),
  }),
  combinations: z.string(),
  customizations: z.object({
    data: z.array(CustomizationSchema),
  }),
  shipping_price: z.string(),
  qty: z.number(),
  slug: z.string(),
  length: z.number(),
  width: z.number(),
  height: z.number(),
  weight: z.number(),
  can_sale: z.boolean(),
})

export const expectedCartArraySchema = z.array(ItemSchema)
