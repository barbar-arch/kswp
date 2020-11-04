import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import search from '../assets/search-new.svg'
import { actLogout } from '../store/actions/auth';

export const logoSatu = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  )
}

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const isLogin = useSelector(state => state.auth.access_token)

  const logout = useCallback(() => dispatch(actLogout()), [dispatch])

  const toLogin = event => {
    if (event) event.preventDefault()
    history.push('/login-kswp')
  }

  const toLogout = event => {
    if (event) event.preventDefault()
    logout()
    history.push('/')
  }

  return (
    <header className="text-gray-700 body-font bg-teal-500 shadow-sm">
      <div className="container lg:w-1/2 mx-auto flex flex-wrap py-5 px-4 lg:px-2 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={search} alt="logo kswp coba" className="w-12 h-12 text-white bg-gray-500 bg-opacity-75 rounded-full shadow-lg" />
          <span className="ml-3 text-md text-gray-100">KSWP (Konfirmasi Status Wajib Pajak)</span>
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" className="text-white lg:mr-5 hover:text-gray-300 text-md text-center">Home</Link>
          {isLogin ? (
            <Link to="/check-kswp" className="text-white lg:mr-5 hover:text-gray-300 text-md text-center">Check</Link>
          ) : null}
        </nav>

        {isLogin ? (
          <button onClick={toLogout} className="shadow inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded-lg text-sm mt-4 md:mt-0">Logout
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        ) : (
            <button onClick={toLogin} className="shadow inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded-lg text-sm mt-4 md:mt-0">Login
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          )}

      </div>
    </header>
  );
};

export default Header;
