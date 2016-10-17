import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { getPostPopular } from 'shared/modules/post/postActions'
import { selectPostsInHomePage } from 'shared/modules/post/postSelectors'

import HomePagePopular from './HomePagePopular'

class HomePagePopularContainer extends Component {
  static prefetchData = [
    () => getPostPopular(),
  ]

  componentDidMount() {
    const { dispatch, postsInHomepage } = this.props
    if (postsInHomepage.length === 0) {
      dispatch(getPostPopular())
    }
  }

  render() {
    return (
      <HomePagePopular posts={this.props.postsInHomepage} />
    )
  }
}

function mapStateToProps(state) {
  const selectPostsInHomePageInSection = selectPostsInHomePage(state)
  return {
    postsInHomepage: selectPostsInHomePageInSection('popular'),
  }
}

HomePagePopularContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  postsInHomepage: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    tags: PropTypes.array,
  })).isRequired,
}

export default connect(mapStateToProps)(HomePagePopularContainer)
