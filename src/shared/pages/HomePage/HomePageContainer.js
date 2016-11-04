import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import HomePage from './HomePage'

class HomepageContainer extends Component {
  render() {
    if (!this.props.data.loading) {
      return (
        <HomePage posts={this.props.data.viewer.posts} />
      )
    }
    return <div>Loading...</div>
  }
}

const GET_POSTS = gql`
  query getPosts {
    viewer {
      posts {
        _id
        title
        body
      }
    }
  }
`

export default graphql(GET_POSTS)(HomepageContainer)
