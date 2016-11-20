import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as userActions from 'shared/actions/userActions'

import s from './MemberMenu.scss'

class MemberMenu extends Component {
  renderMemberSection() {
    if (this.props.user.isAuthenticated) {
      return (
        <div className={s.container}>
          <Link to={'/write'}>Write a story</Link>
          <button onClick={this.props.memberLogout}>Logout</button>
        </div>
      )
    }

    return (
      <div className={`row flex-items-xs-right ${s.container}`}>
        <Link to={`/login`}>Login</Link>
        <Link to={`/signup`}>Register</Link>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderMemberSection()}
      </div>
    )
  }
}

MemberMenu.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps({ user }) {
  return { user }
}

export default connect(mapStateToProps, userActions)(MemberMenu)
