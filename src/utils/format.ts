export const formatPriceToStr = (price: number): string => {
  price = Math.floor(price)
  let res = ''

  const priceStr = price.toString()

  let cnt = 0

  for (let i = priceStr.length - 1; i >= 0; i--) {
    if (cnt === 3) {
      res = '.' + res
      cnt = 0
    }

    res = priceStr.charAt(i) + res
    cnt++
  }

  if (res.charAt(0) === '.') {
    return res.substring(1)
  }
  return res
}

// utils/format.ts

export const formatCurrency = (amount: number) => {
  // Vẫn giữ VND nhưng có thể đổi locale nếu muốn (ví dụ 'en-US' cho USD)
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
}

export const formatDate = (dateString: string) => {
  // Chuyển sang định dạng tiếng Anh (Month Day, Year)
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'CONFIRMED':
      return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'SHIPPING':
      return 'text-purple-600 bg-purple-50 border-purple-200'
    case 'DELIVERED':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'CANCELLED':
      return 'text-red-600 bg-red-50 border-red-200'
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

// Labels translated to English
export const ORDER_TABS = [
  { id: 'ALL', label: 'All' },
  { id: 'PENDING', label: 'Pending' }, // Hoặc 'Unpaid'
  { id: 'SHIPPING', label: 'Shipping' },
  { id: 'DELIVERED', label: 'Delivered' }, // Hoặc 'Completed'
  { id: 'CANCELLED', label: 'Cancelled' }
]
