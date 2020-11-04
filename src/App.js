import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import store from './store/store'
import MainPage from './pages/MainPage'

function App() {
  return (
    <Provider store={store}>
      <Router basename="/kswp">
        <Switch>
          <MainPage />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
