import React from 'react'
import { Link } from 'react-router'
import Icon from 'shared/components/Icon/Icon'
import styles from './Navigation.scss'

const Navigation = () => (
  <ul className={styles.menu}>
    <li className={styles['menu-item']}>
      <Link to="/" activeClassName="active">
        <Icon className="icon-home" />หน้าแรก
      </Link>
    </li>
    <li className={styles['menu-item']}>
      <Link to="/explore" activeClassName="active">
        <Icon className="icon-compass" />ค้นหาเรื่องเที่ยว
      </Link>
    </li>
    <li className={styles['menu-item']}>
      <Link to="/collections" activeClassName="active">
        <Icon className="icon-collection" />Collections
      </Link>
    </li>
    <li className={styles['menu-item']}>
      <Link to="/people" activeClassName="active">
        <Icon className="icon-people" />นักเขียน
      </Link>
    </li>
    <li className={styles['menu-item']}>
      <Link to="/profile" activeClassName="active">
        <Icon className="icon-user" />โปรไฟล์ของคุณ
      </Link>
    </li>
  </ul>
)

export default Navigation
