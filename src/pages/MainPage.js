import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { getStorage } from '../alat/storage'
import { useIsMounted } from '../alat/useIsMounted'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import { actValidateToken } from '../store/actions/auth'
import { INIT_LOCAL_STATE } from '../store/constants'
import CheckNikPage from './CheckNikPage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'

const MainPage = () => {
  const isMounted = useIsMounted()
  const dispatch = useDispatch()
  const [isData, setIsData] = useState(INIT_LOCAL_STATE)
  
  const validateToken = useCallback((
    token,
    onChangeIsData
  ) => dispatch(actValidateToken(
    isMounted,
    token,
    onChangeIsData
  )), [isMounted, dispatch])

  useEffect(() => {
    const storage = getStorage()
    validateToken(storage.getItem('bar'), onChangeIsData)
  }, [validateToken])

  const onChangeIsData = value => {
    setIsData(value)
  }

  return (
    <Switch>
      <Route path="/login-kswp">
        <LoginPage />
      </Route>
      <AuthenticatedRoute loading={isData.loading} path="/check-kswp">
        <CheckNikPage />
      </AuthenticatedRoute>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="*">
        <p>Page notfound 404.</p>
      </Route>
    </Switch>
  )
}

export default MainPage
