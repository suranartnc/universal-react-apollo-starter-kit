import React from 'react'
import { Link } from 'react-router'

function RegisterPageContainer() {
  return (
    <div className="row">
      <div className="col-md">
        <form method="post" action="/api/signup">
          <input type="text" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  )
}

export default RegisterPageContainer
