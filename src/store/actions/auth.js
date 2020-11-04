import { getStorage, storeUserToken } from '../../alat/storage'
import { LOGIN_SUCCESS, CHECK_TOKEN_SUCCESS, LOGOUT_SUCCESS } from '../actionTypes'
import { INIT_LOCAL_STATE } from '../constants'

export const actLoginSuccess = value => ({
  type: LOGIN_SUCCESS,
  payload: {
    access_token: value || null
  }
})

export const actLogin = (isMounted, value, changeData) => {
  return (dispatch, getState, agent) => {
    value = value || {}
    changeData({
      ...INIT_LOCAL_STATE,
      loading: true
    })
    return agent.Api.login()
      .send(value)
      .then(response => {
        response = response.body || null
        storeUserToken(response?.access_token)
        dispatch(actLoginSuccess(response?.access_token))
        if (isMounted.current) {
          changeData({
            ...INIT_LOCAL_STATE,
            loading: false,
            data: response
          })
        }
      })
      .catch(() => {
        if (isMounted.current) {
          changeData({
            ...INIT_LOCAL_STATE,
            loading: false,
            errors: 'error'
          })
        }
      })
  }
}

export const actValidateToken = (
  isMounted,
  token,
  changeData
) => {
  return (dispatch) => {
    token = token || null
    changeData({
      ...INIT_LOCAL_STATE,
      loading: true
    })
    setTimeout(() => {
      dispatch({
        type: CHECK_TOKEN_SUCCESS,
        payload: {
          access_token: token
        }
      })
      if (isMounted.current) {
        changeData({
          ...INIT_LOCAL_STATE,
          loading: false
        })
      }
    }, 100)
  }
}

export const actLogout = () => {
  return (dispatch) => {
    getStorage().removeItem('bar')
    setTimeout(() => {
      dispatch({
        type: LOGOUT_SUCCESS
      })
    }, 100)
  }
}
