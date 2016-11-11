import React from 'react'
import { Link } from 'react-router'

function LoginPageContainer() {
  return (
    <div>
      <form>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="submit" value="Login" />
      </form>
      <Link to="/auth/facebook">Login with facebook</Link>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default LoginPageContainer