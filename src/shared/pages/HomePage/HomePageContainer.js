import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import HomePage from './HomePage'

const HomepageContainer = ({ loading, loadMorePosts, posts }) => {
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <HomePage
      loadMorePosts={loadMorePosts}
      posts={posts}
    />
  )
}

HomepageContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.String,
      title: PropTypes.String,
      body: PropTypes.String,
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

export default withPosts(HomepageContainer)
