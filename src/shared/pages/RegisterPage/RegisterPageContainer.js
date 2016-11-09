import React from 'react'
import { Link } from 'react-router'

function RegisterPageContainer() {
  return (
    <div>
      <form>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="submit" value="Register" />
      </form>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default RegisterPageContainer
