import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

import HomePageLatest from './HomePageLatest'

class HomepageLatestContainer extends Component {

  render() {
    return (
      <HomePageLatest posts={this.props.viewer.posts.edges} />
    )
  }
}

HomepageLatestContainer.propTypes = {
  viewer: PropTypes.shape({
    posts: PropTypes.object,
  }).isRequired,
}

export default Relay.createContainer(HomepageLatestContainer, {
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
