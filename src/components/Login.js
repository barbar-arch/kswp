import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useIsMounted } from '../alat/useIsMounted'
import { actLogin } from '../store/actions/auth'
import { INIT_LOCAL_STATE } from '../store/constants'

const Login = () => {
  const isMounted = useIsMounted()
  const dispatch = useDispatch()
  const { handleSubmit, register, errors } = useForm()
  const [isData, setIsData] = useState(INIT_LOCAL_STATE)

  const okeLogin = useCallback((
    value,
    changeData
  ) => dispatch(actLogin(
    isMounted,
    value,
    changeData
  )), [isMounted, dispatch])

  const onLogin = value => {
    okeLogin(value, onChangeIsData)
  }

  const onChangeIsData = value => {
    setIsData(value)
  }

  return (
    <section className="text-gray-700 body-font">
      <div className="container lg:w-1/2 px-4 lg:px-2 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-1/2 bg-gray-100 rounded-lg shadow p-8 flex flex-col mx-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-700 text-xl font-medium title-font mb-5">Sign In</h2>
          <form className="flex flex-col w-full" onSubmit={handleSubmit(onLogin)} autoComplete="off">
            <input ref={register({required: true})} name="username" className="bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4" placeholder="Username" type="text" />
            <input ref={register({required: true})} name="password" className="bg-white rounded-lg border-2 border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-1" placeholder="Password" type="password" autoComplete="off" />
            {errors.username && <p className="text-xs text-pink-500">Username kosong.</p>}
            {errors.password && <p className="text-xs text-pink-500">Password kosong.</p>}
            {isData.errors ? <p className="text-xs text-pink-500">Gagal login.</p> : null}
            <button
              disabled={isData.loading && `disabled`}
              type="submit"
              className="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded-lg text-md w-1/2 mt-3"
            >{isData.loading ? `Loading...` : `Login`}</button>
            <p className="text-xs text-gray-500 mt-3">Hubungi admin jika lupa password.</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
