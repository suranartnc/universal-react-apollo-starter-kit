import React, { Component, PropTypes } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import {
  withPosts,
  withLikePostFunction,
  withDeletePostFunction,
} from 'shared/modules/post/postActions'

import HomePage from './HomePage'

class HomepageContainer extends Component {
  onClickLike = post => (event) => {
    event.preventDefault()
    this.props.like(post)
  }

  onClickDelete = post => (event) => {
    event.preventDefault()

    if (!confirm('Are you sure?')) {
      return
    }

    this.props.delete(post)
  }

  render() {
    const { loading, loadMore, posts } = this.props

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <HomePage
        loadMore={loadMore}
        onClickLike={this.onClickLike}
        onClickDelete={this.onClickDelete}
        posts={posts}
      />
    )
  }
}

HomepageContainer.propTypes = {
  loading: PropTypes.bool,
  like: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  loadMore: HomePage.propTypes.loadMore,
  posts: HomePage.propTypes.posts,
}

function mapStateToProps(state) {
  return { user: state.user }
}

const withAll = compose(
  withPosts,
  withLikePostFunction,
  withDeletePostFunction,
  connect(mapStateToProps),
)

export default withAll(HomepageContainer)
