import React, { Component } from 'react'
import { Link } from 'react-router'

class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <Link to="/"><h1>Home</h1></Link>
        </div>
      </header>
    )
  }
}

export default Header
