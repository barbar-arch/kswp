import { INIT_LOCAL_STATE } from "../constants"

export const actCallNik = (isMounted, value, dataChange) => {
  return (dispatch, getState, agent) => {
    value = value || {}
    dataChange({
      ...INIT_LOCAL_STATE,
      loading: true,
      data: {}
    })
    return agent.Api.callNik()
      .query(value)
      .then(response => {
        response = response.body || {}
        if (isMounted.current) {
          dataChange({
            ...INIT_LOCAL_STATE,
            loading: false,
            data: response?.data || {}
          })
        }
      })
      .catch(() => {
        if (isMounted.current) {
          dataChange({
            ...INIT_LOCAL_STATE,
            loading: false,
            error: 'error',
            data: {}
          })
        }
      })
  }
}