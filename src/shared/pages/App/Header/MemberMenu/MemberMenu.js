import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { push } from 'react-router-redux'

import { connect } from 'react-redux'
import { logOut } from 'shared/modules/auth/authActions'

import Button from 'shared/components/Button/Button'
import styles from './MemberMenu.scss'

class MemberMenu extends Component {

  onLogoutButtonClick = () => {
    this.props.dispatch(push('/'))
    this.props.dispatch(logOut())
  }

  renderProfile() {
    const { user, auth } = this.props

    if (auth.isLogged) {
      return (
        <div className={styles.container}>
          <Link to={`/profile/${user.uid}`}>
            <div className={styles['user-wrapper']}>
              <div className={styles.photo}>
                <img src={user.photoURL} alt={user.displayName} />
              </div>
              <div className={styles.name}>{user.displayName}</div>
            </div>
          </Link>
          <a href="#" onClick={this.onLogoutButtonClick}>Logout</a>
        </div>
      )
    }
    return (
      <div>
        <a href="/auth/facebook">Login</a>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.action}>
        <div className={styles.user}>
          {this.renderProfile()}
        </div>
        <div className={styles.write}>
          <Button icon="icon-write" node={Link} to="/write">เขียนบทความ</Button>
        </div>
      </div>
    )
  }
}

MemberMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isLogged: PropTypes.bool,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
  }),
}

function mapStateToProps({ user, auth }) {
  return {
    user,
    auth,
  }
}

export default connect(mapStateToProps)(MemberMenu)
