import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import agent from './agent'
import rootReducers from './reducers'

const store = createStore(rootReducers, applyMiddleware(reduxThunk.withExtraArgument(agent)))

window.store = store

export default store
