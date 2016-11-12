import React from 'react'
import { Link } from 'react-router'

function RegisterPageContainer() {
  return (
    <div>
      <form method="post" action="/signup">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Register" />
      </form>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default RegisterPageContainer
