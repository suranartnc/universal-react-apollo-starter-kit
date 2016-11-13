import React from 'react'
import { Link } from 'react-router'

function LoginPageContainer() {
  return (
    <div>
      <form method="post" action="/login">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Login" />
      </form>
      <Link to="/auth/facebook">Login with facebook</Link>
      <Link to="/signup">Register</Link>
    </div>
  )
}

export default LoginPageContainer
