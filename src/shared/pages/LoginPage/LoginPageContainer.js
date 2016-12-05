import React from 'react'
import { Link } from 'react-router'

function LoginPageContainer() {
  return (
    <div className="row">
      <div className="col-md-8">
        <form method="post" action="/api/login">
          <input type="text" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
      <div className="col-md-4">
        <a href="/api/auth/facebook">Facebook</a>
      </div>
    </div>
  )
}

export default LoginPageContainer
