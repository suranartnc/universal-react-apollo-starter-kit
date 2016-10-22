import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

import HomePage from './HomePage'

class HomepageContainer extends Component {

  render() {
    return (
      <HomePage posts={this.props.viewer.posts.edges} />
    )
  }
}

HomepageContainer.propTypes = {
  viewer: PropTypes.shape({
    posts: PropTypes.object,
  }).isRequired,
}

export default Relay.createContainer(HomepageContainer, {
  fragments: {
    posts: () => Relay.QL`
      fragment on Post {
        id
        title
        excerpt
        comments
        date
        author
      }
    `,
  },
})
