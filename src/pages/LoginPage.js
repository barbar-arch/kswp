import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Layout from '../components/Layout'
import Login from '../components/Login'

const LoginPage = () => {
  const isLogin = useSelector(state => state.auth.access_token)

  if (isLogin) return <Redirect to="/check-kswp" />

  return (
    <Layout>
      <Login />
    </Layout>
  )
}

export default LoginPage

