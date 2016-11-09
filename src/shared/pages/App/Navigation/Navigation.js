import React from 'react'
import { Link } from 'react-router'

const Navigation = () => (
  <ul>
    <li>
      <Link to="/" activeClassName="active">หน้าแรก</Link>
      <Link to="/login">เข้าสู่ระบบ</Link>
    </li>
  </ul>
)

export default Navigation
