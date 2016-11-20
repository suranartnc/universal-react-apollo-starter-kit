import React from 'react'
import { Link } from 'react-router'

import Navigation from '../Navigation/Navigation'
import MemberMenu from './MemberMenu/MemberMenu'

import s from './Header.scss'

function Header() {
  return (
    <header className={`container ${s.container}`}>
      <div className={`row flex-items-xs-middle ${s.top}`}>
        <div className="col-md-8">
          <h1><Link to="/" activeClassName="active">Universal React Apollo Starter Kit</Link></h1>
        </div>
        <div className="col-md">
          <MemberMenu />
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export default Header
