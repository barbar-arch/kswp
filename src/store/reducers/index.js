import { combineReducers } from 'redux'
import auth from './auth'
import checkNikKswp from './checkNikKswp'

const rootReducers = combineReducers({
  kswp: checkNikKswp,
  auth: auth
})

export default rootReducers
