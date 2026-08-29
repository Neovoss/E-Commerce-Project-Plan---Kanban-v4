import api from '../../api/axiosInstance.js'
import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
} from './actionTypes.js'
import { setAuthHeader, saveToken, getToken, removeToken } from '../../utils/auth.js'

export const setUser = (user) => ({ type: SET_USER, payload: user })
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language })
export const setAddressList = (addressList) => ({ type: SET_ADDRESS_LIST, payload: addressList })
export const setCreditCards = (cards) => ({ type: SET_CREDIT_CARDS, payload: cards })

// Roller yalnizca ihtiyac halinde cekiliyor: store'da varsa istek atilmiyor
export const fetchRoles = () => async (dispatch, getState) => {
  if (getState().client.roles.length > 0) {
    return getState().client.roles
  }
  const { data } = await api.get('/roles')
  dispatch(setRoles(data))
  return data
}

export const loginUser = (credentials, rememberMe) => async (dispatch) => {
  const { data } = await api.post('/login', credentials)
  dispatch(setUser(data))
  setAuthHeader(data.token)
  if (rememberMe) {
    saveToken(data.token)
  }
  return data
}

export const logoutUser = () => (dispatch) => {
  removeToken()
  setAuthHeader(null)
  dispatch(setUser({}))
}

// Uygulama acilirken localStorage'daki token ile otomatik giris
export const verifyToken = () => async (dispatch) => {
  const token = getToken()
  if (!token) {
    return null
  }

  setAuthHeader(token)
  try {
    const { data } = await api.get('/verify')
    dispatch(setUser(data))
    if (data.token) {
      saveToken(data.token)
      setAuthHeader(data.token)
    }
    return data
  } catch (error) {
    console.error('Token verification failed:', error)
    removeToken()
    setAuthHeader(null)
    return null
  }
}

// T20: adres islemleri
export const fetchAddresses = () => async (dispatch) => {
  const { data } = await api.get('/user/address')
  dispatch(setAddressList(data))
  return data
}

export const saveAddress = (address) => async (dispatch) => {
  await api.post('/user/address', address)
  return dispatch(fetchAddresses())
}

export const updateAddress = (address) => async (dispatch) => {
  await api.put('/user/address', address)
  return dispatch(fetchAddresses())
}

export const deleteAddress = (addressId) => async (dispatch) => {
  await api.delete(`/user/address/${addressId}`)
  return dispatch(fetchAddresses())
}

// T21: kayitli kart islemleri
export const fetchCards = () => async (dispatch) => {
  const { data } = await api.get('/user/card')
  dispatch(setCreditCards(data))
  return data
}

export const saveCard = (card) => async (dispatch) => {
  await api.post('/user/card', card)
  return dispatch(fetchCards())
}

export const updateCard = (card) => async (dispatch) => {
  await api.put('/user/card', card)
  return dispatch(fetchCards())
}

export const deleteCard = (cardId) => async (dispatch) => {
  await api.delete(`/user/card/${cardId}`)
  return dispatch(fetchCards())
}
