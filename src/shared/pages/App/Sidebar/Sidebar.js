import React, { PropTypes } from 'react'
import cx from 'classnames'
import Navigation from '../Navigation/Navigation'

import styles from './Sidebar.scss'

const Header = (props) => {
  const classes = {
    isActive: props.isMenuOpen,
  }

  return (
    <div className={cx(styles.container, classes)}>
      <div className={styles.inner}>
        <Navigation />
      </div>
    </div>
  )
}

Header.propTypes = {
  isMenuOpen: PropTypes.bool,
}

export default Header
