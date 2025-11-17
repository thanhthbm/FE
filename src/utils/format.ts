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
