import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

import AddPostMutation from 'shared/relay/mutations/addPostMutation'

import HomePage from './HomePage'

class HomepageContainer extends Component {

  addPost = () => {
    const addPostMutation = new AddPostMutation({
      viewerId: this.props.viewer.id,
      title: 'This is the title',
      body: 'This is the bidy',
    })
    Relay.Store.commitUpdate(addPostMutation)
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
