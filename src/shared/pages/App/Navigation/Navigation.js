import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import s from './Navigation.scss'

class Nav extends Component {
  render() {
    return (
      <div className={s.container}>
        <Link to={`/`} activeClassName="active">Latest</Link>
        <Link to={`/popular`}>Popular</Link>
        <Link to={`/top`}>Editor's Pick</Link>
      </div>
    )
  }
}

Nav.contextTypes = {
  router: PropTypes.object
}

export default Nav
