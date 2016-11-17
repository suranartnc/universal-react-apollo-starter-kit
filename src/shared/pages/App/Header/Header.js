import React from 'react'
import { Link } from 'react-router'

import Navigation from '../Navigation/Navigation'
import MemberMenu from './MemberMenu/MemberMenu'

import s from './Header.scss'

function Header() {
  return (
    <header className={s.container}>
      <div className={s.wrapper}>
        <div className={s.top}>
          <h1><Link to="/" activeClassName="active">Universal React Apollo Starter Kit</Link></h1>
          <MemberMenu />
        </div>
        <Navigation />
      </div>
    </header>
  )
}

export default Header
