import React, { Component } from 'react'
import cx from 'classnames'
import { Link } from 'react-router'

import SearchBar from './SearchBar/SearchBar'
import MemberMenu from './MemberMenu/MemberMenu'

import styles from './Header.scss'

class Header extends Component {

  state = {
    isMenuOpen: false,
  }

  toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    })
  }

  render() {
    return (
      <header className={styles.container}>
        <div className={styles.wrapper}>
          <button onClick={this.toggleMenu} className={styles['menu-button']}>
            <div className={cx(styles['menu-button-icon'], this.state.isMenuOpen)}>
              <span />
              <span />
              <span />
            </div>
          </button>
          <div className={styles.logo}>
            <Link to="/"><h1 className={styles['logo-text']}>TRIPBY.ME</h1></Link>
          </div>
          <div className={styles.panel}>
            <SearchBar />
          </div>
          <MemberMenu />
        </div>
      </header>
    )
  }
}

export default Header
