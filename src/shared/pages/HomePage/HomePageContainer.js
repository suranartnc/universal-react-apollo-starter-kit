import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import HomePage from './HomePage'

class HomepageContainer extends Component {
  onClickLike = post => (event) => {
    event.preventDefault()
    this.props.like(post)
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
        posts={posts}
      />
    )
  }
}

HomepageContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      likes: PropTypes.number,
    })
  ),
}

const GET_POSTS = gql`
  query getPosts($offset: Int, $limit: Int) {
    viewer {
      posts(offset: $offset, limit: $limit) {
        _id
        title
        body
        likes
      }
    }
  }
`

const withPosts = graphql(GET_POSTS, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 1,
    },
    forceFetch: true, // todo: this cause problem with ssr, find a way to solves it
  }),

  props: ({ data: { loading, viewer: { posts = [] } = {}, fetchMore } }) => ({
    loading,
    posts,
    loadMorePosts: () => fetchMore({
      variables: {
        offset: posts.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) {
          return previousResult
        }

        return Object.assign({}, previousResult, {
          viewer: {
            posts: [...previousResult.viewer.posts, ...fetchMoreResult.data.viewer.posts],
          },
        })
      },
    }),
  }),
})

const LIKE_POST_MUTATION = gql`
  mutation likePost($id: String!) {
    likePost(_id: $id) {
      _id
      title
      body
      likes
    }
  }
`
const likePostFunction = mutate => post => mutate({
  variables: { id: post._id },
  optimisticResponse: {
    __typename: 'Mutation',
    likePost: {
      ...post,
      __typename: 'Post',
      likes: post.likes + 1,
    },
  },
})

const withLikePostFunction = graphql(LIKE_POST_MUTATION, {
  props: ({ mutate }) => ({
    like: likePostFunction(mutate),
  }),
})

export default withLikePostFunction(withPosts(HomepageContainer))
