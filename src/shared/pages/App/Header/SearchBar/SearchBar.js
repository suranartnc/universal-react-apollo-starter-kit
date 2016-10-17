import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import Icon from 'shared/components/Icon/Icon'
import styles from './SearchBar.scss'

class SearchBar extends Component {

  handleKeywordChanged = (e) => {
    console.log(e.target.value)
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['input-wrapper']}>
          <Icon className={cx('icon-search', styles.icon)} />
          <input type="text" className={styles.input} placeholder="SEARCH..." onChange={this.handleKeywordChanged} />
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(SearchBar)
