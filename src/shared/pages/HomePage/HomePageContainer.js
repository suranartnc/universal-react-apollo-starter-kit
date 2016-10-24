import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

import AddPostMutation from 'shared/relay/mutations/addPostMutation'

import HomePage from './HomePage'

class HomepageContainer extends Component {

  addPost = () => {
    const addPostMutation = new AddPostMutation({
      viewer: this.props.viewer,
      title: 'This is the title',
      body: 'This is the bidy',
    })
    this.props.relay.commitUpdate(addPostMutation)
  }

  render() {
    return (
      <HomePage addPost={this.addPost} posts={this.props.viewer.posts.edges} />
    )
  }
}

HomepageContainer.propTypes = {
  viewer: PropTypes.shape({
    id: PropTypes.string,
    posts: PropTypes.object,
  }).isRequired,
}

export default Relay.createContainer(HomepageContainer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id,
        posts(first: 10) {
          edges {
            node {
              _id
              title
            }
          }
        }
      }
    `,
  },
})
