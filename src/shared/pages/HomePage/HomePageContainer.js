import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import HomePage from './HomePage'

class HomepageContainer extends Component {
  render() {
    if (!this.props.loading) {
      return (
        <HomePage loadMorePosts={this.props.loadMorePosts} posts={this.props.posts} />
      )
    }
    return <div>Loading...</div>
  }
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

export default graphql(GET_POSTS, {
  options(props) {
    return {
      variables: {
        offset: 0,
        limit: 1,
      },
      forceFetch: true,
    }
  },
  props({ data: { loading, viewer: { posts = [] } = {}, fetchMore } }) {
    return {
      loading,
      posts,
      loadMorePosts() {
        return fetchMore({
          variables: {
            offset: posts.length,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            console.log('previousResult', previousResult)
            console.log('fetchMoreResult', fetchMoreResult)
            if (!fetchMoreResult.data) { return previousResult }
            return Object.assign({}, previousResult, {
              viewer: {
                posts: [...previousResult.viewer.posts, ...fetchMoreResult.data.viewer.posts],
              },
            })
          },
        })
      },
    }
  },
})(HomepageContainer)
