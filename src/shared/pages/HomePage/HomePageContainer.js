import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
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

    const { user, router, like } = this.props

    if (!user.isAuthenticated) {
      router.push('/login')
      return
    }

    like(post)
      .then(undefined, (err) => {
        alert(err.message)
      })
  }

  onClickDelete = post => (event) => {
    event.preventDefault()

    if (!confirm('Are you sure?')) {
      return
    }

    this.props.delete(post)
      .catch(err => alert(err.message))
  }

  render() {
    const { loading, refetch, loadMore, posts } = this.props

    if (loading) {
      return <div>Loading...</div>
    }

    return (
      <HomePage
        loadMore={loadMore}
        refetch={refetch}
        onClickLike={this.onClickLike}
        onClickDelete={this.onClickDelete}
        posts={posts}
      />
    )
  }
}

HomepageContainer.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  loading: PropTypes.bool,
  like: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  loadMore: HomePage.propTypes.loadMore,
  refetch: HomePage.propTypes.refetch,
  posts: HomePage.propTypes.posts,
}

function mapStateToProps(state) {
  return { user: state.user }
}

const withAll = compose(
  withPosts,
  withLikePostFunction,
  withDeletePostFunction,
  withRouter,
  connect(mapStateToProps),
)

export default withAll(HomepageContainer)
