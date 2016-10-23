import React, { Component } from 'react'
import { Link } from 'react-router'

import styles from './Header.scss'

class Header extends Component {
  render() {
    return (
      <header className={styles.container}>
        <div className={styles.wrapper}>
          <button onClick={this.toggleMenu}>
            <div>
              <span />
              <span />
              <span />
            </div>
          </button>
          <div className={styles.logo}>
            <Link to="/"><h1 className={styles['logo-text']}>React Relay Starter Kit</h1></Link>
          </div>
          <div className={styles.panel}>

          </div>
        </div>
      </header>
    )
  }
}

export default Header
