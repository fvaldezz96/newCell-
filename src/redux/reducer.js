const {
  GET_ALL_PRODUCTS,
  ACTIVE_LOADING,
  GET_ALL_BRANDS,
  CELL_DETAIL,
  POST_PRODUCT,
  GET_ADMIN,
  GET_ALL_USERS,
  GET_ALL_RATING,
  POST_USER,
  USER_ID,
  ALL_USER,
  GET_USER_CART,
  GET_ALL_ORDERS,
  GET_ORDER_ID,
  GET_ORDERS_USER,
  UPDATE_QUANTITY,
  GET_REVIEW_BOOLEAN
} = require('./actions.js')

const initialState = {
  products: [],
  allProducts: [],
  isLoading: true,
  brands: [],
  admin: false,
  users: [],
  user: [],
  allUser: [],
  cart: [],
  orders: [],
  order: {},
  allUser: [],
  allRating: [],
  rating: false
}

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_PRODUCTS:
      if (!payload) { return state }
      return {
        ...state,
        products: payload,
        isLoading: false
      }
    case GET_ALL_RATING:
      return ({
        ...state,
        rating: payload
      })
    case CELL_DETAIL:
      return ({
        ...state,
        details: payload
      })
    case POST_PRODUCT:
      return {
        ...state,
      }
    case GET_ADMIN:
      return {
        ...state,
        admin: payload
      }
    case "clean estado":
      return ({
        ...state,
        details: []
      })
    case POST_USER:
      return {
        ...state,

      }
    case ACTIVE_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case GET_ALL_BRANDS:
      return {
        ...state,
        brands: payload
      }
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload
      }
    case USER_ID:
      return ({
        ...state,
        user: payload
      })
    case ALL_USER:
      return {
        ...state,
        allUser: payload
      }

    case GET_ALL_USERS:
      return {
        ...state,
        users: payload
      }
    case USER_ID:
      return ({
        ...state,
        user: payload
      })
    case ALL_USER:
      return {
        ...state,
        allUser: payload
      }

    case GET_USER_CART:
      return {
        ...state,
        cart: payload,
        isLoading: false
      }
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: payload
      }
    case GET_ORDER_ID:
      return {
        ...state,
        orders: payload
      }
    case UPDATE_QUANTITY:
      let c = state.cart.map(e => e)
      let found = c.findIndex(e => e.id === payload.id)
      c[found].quantity = payload.quantity
      return {
        ...state,
        cart: c
      }
    case GET_REVIEW_BOOLEAN:
      return {
        ...state,
        rating: payload
      }

    default:
      return state
  }
}