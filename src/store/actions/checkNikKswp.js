import { INIT_LOCAL_STATE } from '../constants'

export const actCheckNikKswp = (isMounted, value, dataChange) => {
  return (dispatch, getState, agent) => {
    value = value || {}
    dataChange({
      ...INIT_LOCAL_STATE,
      data: [],
      loading: true
    })
    return agent.Api.checkNikKswp()
      .send(value)
      .then(response => {
        response = response.body || {}
        if (isMounted.current) {
          dataChange({
            ...INIT_LOCAL_STATE,
            loading: false,
            data: response?.data || []
          })
        }
      })
      .catch(() => {
        if (isMounted.current) {
          dataChange({
            ...INIT_LOCAL_STATE,
            loading: false,
            data: [],
            errors: 'error'
          })
        }
      })
  }
}

export const actCheckTunggakkan = (isMounted, value, dataChange) => {
  return (dispatch, getState, agent) => {
    value = value || {}
    dataChange({
      ...INIT_LOCAL_STATE,
      data: [],
      loading: true
    })
    return agent.Api.checkTunggakkan()
      .query(value)
      .then(response => {
        response = response.body || {}
        if (isMounted.current) {
          dataChange({
            ...INIT_LOCAL_STATE,
            loading: false,
            data: response?.data || []
          })
        }
      })
      .catch(error => {
        if (isMounted.current) {
          dataChange({
            ...INIT_LOCAL_STATE,
            loading: false,
            data: [],
            errors: 'error'
          })
        }
      })
  }
}
