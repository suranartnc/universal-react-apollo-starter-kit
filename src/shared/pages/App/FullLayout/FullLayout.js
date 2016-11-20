import React, { PropTypes } from 'react'

import Header from 'shared/pages/App/Header/Header'
import Sidebar from 'shared/pages/App/Sidebar/Sidebar'

import styles from './FullLayout.scss'

const FullLayout = props => (
  <div>
    <Header />
    <Sidebar />
    <div className={`container ${styles.main}`}>
      {props.children}
    </div>
  </div>
)

FullLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FullLayout
