import React from 'react'
import { Link } from 'react-router'
import styles from './Navigation.scss'

const Navigation = () => (
  <ul className={styles.menu}>
    <li className={styles['menu-item']}>
      <Link to="/" activeClassName="active">
        หน้าแรก
      </Link>
    </li>
  </ul>
)

export default Navigation
