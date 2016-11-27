import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { connect } from 'react-redux'

import update from 'immutability-helper'
import gql from 'graphql-tag'

import {
  withPosts,
  withLikePostFunction,
  withDeletePostFunction,
} from 'shared/modules/post/postActions'

import HomePage from './HomePage'

class HomepageContainer extends Component {
  subscription = null

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

  subscribe(updateQuery) {
    const SUBSCRIPTION_QUERY = gql`
      subscription newPosts {
        postAdded {
          _id
          excerpt
          haveLiked
          likes
          thumbnail
          title
        }
      }
    `
    // we don't resubscribe on changed props, because it never happens in our app
    if (!this.subscription) {
      this.subscription = this.props.subscribeToMore({
        document: SUBSCRIPTION_QUERY,
        // variables: {},
        updateQuery,
      })
    }
  }

  componentDidMount() {
    this.subscribe((previousResult, { subscriptionData }) => {
      console.log('==subscriptionData', subscriptionData)

      const newPost = subscriptionData.data.postAdded
      const newResult = update(previousResult, {
        viewer: {
          posts: {
            edges: {
              $push: [{
                node: newPost,
              }],
            },
          },
        },
      })
      console.log('new result', newResult)
      return newResult
    })
  }

  render() {
    const { loading, refetch, loadMore, posts } = this.props
    console.log(this.props.posts)
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
  subscribeToMore: PropTypes.func.isRequired,
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
