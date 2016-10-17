import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { getPostFollowing } from 'shared/modules/post/postActions'
import { selectPostsInHomePage } from 'shared/modules/post/postSelectors'

import HomePageFollowing from './HomePageFollowing'

class HomePageFollowingContainer extends Component {

  componentDidMount() {
    const { dispatch, postsInHomepage, following } = this.props
    if (postsInHomepage.length === 0) {
      dispatch(getPostFollowing(following))
    }
  }

  render() {
    return (
      <HomePageFollowing posts={this.props.postsInHomepage} />
    )
  }
}

function mapStateToProps(state) {
  const selectPostsInHomePageInSection = selectPostsInHomePage(state)
  const following = 'sdkyUsN3HseS4PfahfaKHwmeZ8C2' // mock uid
  return {
    postsInHomepage: selectPostsInHomePageInSection('following'),
    following,
  }
}

HomePageFollowingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postsInHomepage: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array,
  })).isRequired,
}

export default connect(mapStateToProps)(HomePageFollowingContainer)
