import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { getPostStaffPick } from 'shared/modules/post/postActions'
import { selectPostsInHomePage } from 'shared/modules/post/postSelectors'

import HomePageStaffPick from './HomePageStaffPick'

class HomePageStaffPickContainer extends Component {
  static prefetchData = [
    () => getPostStaffPick(),
  ]

  componentDidMount() {
    const { dispatch, postsInHomepage } = this.props
    if (postsInHomepage.length === 0) {
      dispatch(getPostStaffPick())
    }
  }

  render() {
    return (
      <HomePageStaffPick posts={this.props.postsInHomepage} />
    )
  }
}

function mapStateToProps(state) {
  const selectPostsInHomePageInSection = selectPostsInHomePage(state)
  return {
    postsInHomepage: selectPostsInHomePageInSection('staffpick'),
  }
}

HomePageStaffPickContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postsInHomepage: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array,
  })).isRequired,
}

export default connect(mapStateToProps)(HomePageStaffPickContainer)
