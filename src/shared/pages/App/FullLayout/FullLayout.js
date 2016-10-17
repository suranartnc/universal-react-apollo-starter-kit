import React, { PropTypes } from 'react'
import styles from './FullLayout.scss'

const FullLayout = props => (
  <div className={styles.container}>
    <div className={styles.main}>
      {props.children}
    </div>
  </div>
)

FullLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FullLayout
