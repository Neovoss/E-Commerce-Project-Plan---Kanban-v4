import api from '../../api/axiosInstance.js'
import { clearCart } from './shoppingCartActions.js'

// T22: siparis olusturma
export const createOrder = (payload) => async (dispatch) => {
  const { data } = await api.post('/order', payload)
  dispatch(clearCart())
  return data
}

// T23: gecmis siparisler
export const fetchOrders = () => async () => {
  const { data } = await api.get('/order')
  return data
}
