import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as userActions from 'shared/actions/userActions'

class Nav extends Component {
  renderMemberSection() {
    if (this.props.user.isAuthenticated) {
      return (
          <li><a href="#" onClick={this.props.memberLogout}>Logout</a></li>
      )
    }

    return (
      <li><Link to="/login">Login</Link></li>
    )
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/" activeClassName="active">Home</Link></li>
          {this.renderMemberSection()}
        </ul>
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
