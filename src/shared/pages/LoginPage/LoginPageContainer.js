import React from 'react'
import { Link } from 'react-router'

function LoginPageContainer() {
  return (
    <div>
      <form method="post" action="/api/login">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default LoginPageContainer
