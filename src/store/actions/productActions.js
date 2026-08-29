import api from '../../api/axiosInstance.js'
import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_PRODUCT,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  FETCH_STATES,
} from './actionTypes.js'

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories })
export const setProductList = (products) => ({ type: SET_PRODUCT_LIST, payload: products })
export const setProduct = (product) => ({ type: SET_PRODUCT, payload: product })
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total })
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState })
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit })
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset })
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter })

export const fetchCategories = () => async (dispatch, getState) => {
  if (getState().product.categories.length > 0) {
    return getState().product.categories
  }
  try {
    const { data } = await api.get('/categories')
    dispatch(setCategories(data))
    return data
  } catch (error) {
    console.error('Categories could not be fetched:', error)
    return []
  }
}

export const fetchProducts = (params = {}) => async (dispatch) => {
  dispatch(setFetchState(FETCH_STATES.FETCHING))
  try {
    const { data } = await api.get('/products', { params })
    dispatch(setProductList(data.products))
    dispatch(setTotal(data.total))
    dispatch(setFetchState(FETCH_STATES.FETCHED))
    return data
  } catch (error) {
    console.error('Products could not be fetched:', error)
    dispatch(setFetchState(FETCH_STATES.FAILED))
    return null
  }
}

// T16: tekil urun /products/:productId ucundan cekiliyor
export const fetchProduct = (productId) => async (dispatch) => {
  dispatch(setFetchState(FETCH_STATES.FETCHING))
  try {
    const { data } = await api.get(`/products/${productId}`)
    dispatch(setProduct(data))
    dispatch(setFetchState(FETCH_STATES.FETCHED))
    return data
  } catch (error) {
    console.error('Product could not be fetched:', error)
    dispatch(setFetchState(FETCH_STATES.FAILED))
    return null
  }
}
