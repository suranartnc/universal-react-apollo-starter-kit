import React, { Component } from 'react'
import Navigation from '../Navigation/Navigation'

import styles from './Header.scss'

class Header extends Component {
  render() {
    return (
      <header className={styles.container}>
        <Navigation />
      </header>
    )
  }
}

export default Header
