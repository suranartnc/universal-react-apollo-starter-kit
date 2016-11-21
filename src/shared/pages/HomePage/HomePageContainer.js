import React, { Component, PropTypes } from 'react'
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
    const { loading, loadMorePosts, posts } = this.props

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <HomePage
        loadMorePosts={loadMorePosts}
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
  loadMorePosts: HomePage.propTypes.loadMorePosts,
  posts: HomePage.propTypes.posts,
}

function mapStateToProps(state) {
  // console.log(state.user)
  return {}
}

export default connect(mapStateToProps)(withDeletePostFunction(withLikePostFunction(withPosts(HomepageContainer))))
