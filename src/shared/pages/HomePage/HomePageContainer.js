import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

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

const GET_POSTS = gql`
  query getPosts($limit: Int, $after: String) {
    viewer {
      posts(first: $limit, after: $after) {
        edges {
          node {
            _id
            title
            excerpt
            thumbnail
            likes
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

const withPosts = graphql(GET_POSTS, {
  options: () => ({
    variables: {
      limit: 5,
      after: '',
    },
  }),

  props: (fetchResult) => {
    const { data: { loading, viewer: { posts = {} } = {}, fetchMore } } = fetchResult

    const { edges = [], pageInfo = {} } = posts

    const { hasNextPage } = pageInfo

    return {
      loading,
      posts: edges.map(edge => edge.node),
      hasNextPage,
      loadMorePosts: () => fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.data) {
            return previousResult
          }

          return {
            ...fetchMoreResult.data,
            viewer: {
              ...fetchMoreResult.data.viewer,
              posts: {
                ...fetchMoreResult.data.viewer.posts,
                edges: [
                  ...previousResult.viewer.posts.edges,
                  ...fetchMoreResult.data.viewer.posts.edges,
                ],
              },
            },
          }
        },
      }),
    }
  },
})

const LIKE_POST_MUTATION = gql`
  mutation likePost($id: String!) {
    likePost(_id: $id) {
      _id
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

const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: String!) {
    deletePost(_id: $id) {
      _id
    }
  }
`

const deletePost = mutate => post => mutate({
  variables: { id: post._id },
  optimisticResponse: {
    deletePost: {
      ...post,
      __typename: 'Post',
    },
  },
  updateQueries: {
    getPosts: (previousResult, { mutationResult }) => {
      const { viewer: { posts: { edges } } } = previousResult

      const nonDeletedEdges = edges.filter(edge => (
        edge.node._id !== mutationResult.data.deletePost._id
      ))

      return {
        ...previousResult,
        viewer: {
          ...previousResult.viewer,
          posts: {
            ...previousResult.viewer.posts,
            edges: nonDeletedEdges,
          },
        },
      }
    },
  },
})

const withDeletePostFunction = graphql(DELETE_POST_MUTATION, {
  props: ({ mutate }) => ({
    delete: deletePost(mutate),
  }),
})

function mapStateToProps(state) {
  // console.log(state.user)
  return {}
}

export default connect(mapStateToProps)(withDeletePostFunction(withLikePostFunction(withPosts(HomepageContainer))))
