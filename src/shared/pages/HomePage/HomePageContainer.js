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
    viewer: () => Relay.QL`
      fragment on Viewer {
        posts(first: 10) {
          edges {
            node {
              id
              title
              excerpt
              likes
              comments
              shares
              pubDate
              userId {
                id
              }
            }
          }
        }
      }
    `,
  },
})
