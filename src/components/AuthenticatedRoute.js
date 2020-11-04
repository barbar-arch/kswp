import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, Route, useLocation } from 'react-router-dom'

function AuthenticatedRoute({ children, loading, ...rest }) {
  const isLogin = useSelector(state => state.auth.access_token)
  const location = useLocation()


  if (!isLogin) {
    if (loading) return <p>Loading...</p>
    return <p>Anda harus <Link className="bg-gray-500 px-2 rounded-md text-white hover:bg-gray-400 text-xs" to="/login-kswp">login</Link>.</p>
  }

  if (!isLogin) {
    return (
      <Redirect
        to={{
          pathname: '/login-kswp',
          state: { referrer: location.state?.referrer || location.pathname }
        }}
      />
    )
  }

  return <Route {...rest}>{children}</Route>
}

export default AuthenticatedRoute
