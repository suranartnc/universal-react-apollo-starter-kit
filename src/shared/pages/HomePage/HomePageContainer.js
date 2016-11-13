import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
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
  loading: PropTypes.bool.isRequired,
  like: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  loadMorePosts: HomePage.propTypes.loadMorePosts,
  posts: HomePage.propTypes.posts,
}

const GET_POSTS = gql`
  query getPosts($offset: Int, $limit: Int) {
    viewer {
      posts(offset: $offset, limit: $limit) {
        _id
        title
        excerpt
        thumbnail
        likes
      }
    }
  }
`

const withPosts = graphql(GET_POSTS, {
  options: () => ({
    variables: {
      offset: 0,
      limit: 5,
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
      const { viewer: { posts } } = previousResult

      const nonDeletedPosts = posts.filter(previousPost => (
        previousPost._id !== mutationResult.data.deletePost._id
      ))

      return {
        viewer: {
          ...previousResult.viewer,
          posts: nonDeletedPosts,
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

export default withDeletePostFunction(withLikePostFunction(withPosts(HomepageContainer)))
