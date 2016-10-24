import React, { PropTypes } from 'react'
import Navigation from '../Navigation/Navigation'

import styles from './Sidebar.scss'

const Header = () => {
  return (
    <div>
      <div className={styles.inner}>
        <Navigation />
      </div>
    </div>
  )
}

export default Header
