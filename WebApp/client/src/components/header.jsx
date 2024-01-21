import React from 'react'
import { useContext } from 'react'
import { AppContext } from './ContextProvider'
import { accessTokenCookieName, refreshTokenCookieName } from '../constants/CookiesNames'
import Cookies from 'js-cookie'

function Header() {
  const { connected, setConnected } = useContext(AppContext)

  const disconnect = () => {
    Cookies.remove(accessTokenCookieName)
    Cookies.remove(refreshTokenCookieName)
    setConnected(false)

  }
  return (
    <ul className='text-right p-6 w-full font-bold text-white bg-[#4f5d73]'>
      <li><button onClick={disconnect}>Se déconnecter</button></li>
    </ul>
  )
}

export default Header