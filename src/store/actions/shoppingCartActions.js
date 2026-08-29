import { SET_CART, SET_PAYMENT, SET_ADDRESS } from './actionTypes.js'

export const setCart = (cart) => ({ type: SET_CART, payload: cart })
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment })
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address })

// T17: ayni urun tekrar eklenirse adet artiyor
export const addToCart = (product, count = 1) => (dispatch, getState) => {
  const { cart } = getState().shoppingCart
  const existing = cart.find((item) => item.product.id === product.id)

  const nextCart = existing
    ? cart.map((item) =>
        item.product.id === product.id ? { ...item, count: item.count + count } : item,
      )
    : [...cart, { count, checked: true, product }]

  dispatch(setCart(nextCart))
  return nextCart
}

export const updateCartCount = (productId, count) => (dispatch, getState) => {
  const { cart } = getState().shoppingCart
  if (count < 1) {
    return dispatch(removeFromCart(productId))
  }
  dispatch(
    setCart(cart.map((item) => (item.product.id === productId ? { ...item, count } : item))),
  )
  return null
}

export const removeFromCart = (productId) => (dispatch, getState) => {
  const { cart } = getState().shoppingCart
  dispatch(setCart(cart.filter((item) => item.product.id !== productId)))
  return null
}

export const toggleCartItem = (productId) => (dispatch, getState) => {
  const { cart } = getState().shoppingCart
  dispatch(
    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, checked: !item.checked } : item,
      ),
    ),
  )
  return null
}

export const clearCart = () => (dispatch) => {
  dispatch(setCart([]))
  dispatch(setPayment({}))
  dispatch(setAddress({}))
}
