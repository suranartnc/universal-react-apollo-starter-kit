import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as userActions from 'shared/actions/userActions'

class Nav extends Component {
  renderMemberSection() {
    if (this.props.user.isAuthenticated) {
      return (
        <button onClick={this.props.memberLogout}>Logout</button>
      )
    }

    return (
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Register</Link></li>
      </ul>
    )
  }

  render() {
    return (
      <div>
        <Link to="/" activeClassName="active">Home</Link>
        {this.renderMemberSection()}
      </div>
    )
  }
}

Nav.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps, userActions)(Nav)
