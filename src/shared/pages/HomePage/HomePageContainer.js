import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import HomePage from './HomePage'

class HomepageContainer extends Component {

  addPost = () => {
    // const addPostMutation = new AddPostMutation({
    //   viewer: this.props.viewer,
    //   title: 'This is the title',
    //   body: 'This is the bidy',
    // })
    // this.props.relay.commitUpdate(addPostMutation)
  }

  render() {
    if (!this.props.data.loading) {
      return (
        <HomePage addPost={this.addPost} posts={this.props.data.viewer.posts} />
      )
    }
    return null
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
