import React, { Component, PropTypes } from 'react'
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
    return (
      <HomePage addPost={this.addPost} posts={this.props.posts} />
    )
  }
}

export default HomepageContainer
