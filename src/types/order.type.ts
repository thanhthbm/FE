export type OrderItemRequest = {
  variantId: string
  quantity: number
  price: number
}

export type CreateOrderRequest = {
  addressId: string
  paymentMethod: string
  note?: string
  shippingFee?: number
}

export type OrderResponse = {
  orderId: string
  paymentMethod: string
  paymentStatus: string
  paymentUrl: string | null
  orderCode: string
  orderStatus: string
  orderDate: string
  totalAmount: number
}

export type AddressDTO = {
  id: string
  receiverName: string
  phoneNumber: string
  detail: string
  ward: string
  province: string
}

export type PaymentDTO = {
  id: string
  paymentDate: string
  paymentMethod: string
  amount: number
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | string
}

export type OrderItemDTO = {
  id: string
  quantity: number
  itemPrice: number
  subTotal: number
  productVariantId: string
  variantName: string
  productId: string
  productName: string
  productBrand: string
  productSlug: string
  productThumbnail: string | null
}

export type OrderDTO = {
  id: string
  orderDate: string
  orderStatus: 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED' | string
  totalAmount: number
  discount: number | null

  paymentMethod: string
  shipmentTrackingNumber: string | null
  expectedDeliveryDate: string | null

  shippingAddress: AddressDTO
  paymentInfo: PaymentDTO | null
  orderItems: OrderItemDTO[]
}

export type TransactionResult = {
  status: 'success' | 'failed' | string
  orderId: string
  message: string
}
