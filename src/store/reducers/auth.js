import { LOGIN_SUCCESS, CHECK_TOKEN_SUCCESS, LOGOUT_SUCCESS } from "../actionTypes"

const initialState = {
  access_token: null
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { access_token } = action.payload
      return {
        ...state,
        access_token: access_token || null
      }
    }
      
    case CHECK_TOKEN_SUCCESS: {
      const { access_token } = action.payload
      return {
        ...state,
        access_token: access_token
      }
    }
      
    case LOGOUT_SUCCESS: {
      return initialState
    }
  
    default:
      return state
  }
}

export default auth
