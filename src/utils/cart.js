export const SHIPPING_COST = 29.99
export const FREE_SHIPPING_LIMIT = 150
export const DISCOUNT_LIMIT = 500
export const DISCOUNT_AMOUNT = 50

export function selectedItems(cart) {
  return cart.filter((item) => item.checked)
}

export function cartTotals(cart) {
  const items = selectedItems(cart)
  const productsTotal = items.reduce((sum, item) => sum + item.product.price * item.count, 0)
  const shipping = productsTotal > 0 && productsTotal < FREE_SHIPPING_LIMIT ? SHIPPING_COST : 0
  const discount = productsTotal >= DISCOUNT_LIMIT ? DISCOUNT_AMOUNT : 0
  return {
    itemCount: items.reduce((sum, item) => sum + item.count, 0),
    productsTotal,
    shipping,
    discount,
    grandTotal: Math.max(0, productsTotal + shipping - discount),
  }
}
