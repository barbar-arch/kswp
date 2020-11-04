import { CHECK_NIKKSWP_START } from '../actionTypes'

const initialState = {
  data: []
}

const checkNikKswp = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_NIKKSWP_START: {
      return {
        ...state,
        data: []
      }
    }
      
    default:
      return state
  }
}

export default checkNikKswp
