import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import cx from 'classnames'

import styles from './NewFeedTabs.scss'

class NewFeedTabs extends Component {
  tabs = [
    {
      path: '/latest',
      label: 'บทความล่าสุด',
    },
    {
      path: '/popular',
      label: 'บทความยอดนิยม',
    },
    {
      path: '/following',
      label: 'Following',
      requireAuth: true,
    },
    {
      path: '/staffpick',
      label: 'Staff Pick',
    },
  ]
  render() {
    const { pathname, auth: { isLogged } } = this.props
    return (
      <div className={styles.container}>
        <ul className={styles.list}>
          {this.tabs.filter((tab) => {
            return (!tab.requireAuth || (tab.requireAuth && isLogged))
          }).map((tab, index) => (
            <li key={index} className={styles.item}>
              <Link to={tab.path} className={cx({ active: pathname === tab.path })}>{tab.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

NewFeedTabs.propTypes = {
  pathname: PropTypes.string,
}

function mapStateToProps(state) {
  let pathname = ''
  if (state.routing.locationBeforeTransitions !== null) {
    pathname = state.routing.locationBeforeTransitions.pathname
  }
  return {
    pathname,
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(NewFeedTabs)
