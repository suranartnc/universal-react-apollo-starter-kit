import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import EntryPage from './EntryPage'

class EntryPageContainer extends Component {
  render() {
    return (
      <EntryPage post={this.props.post} />
    )
  }
}

EntryPageContainer.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
}

export default Relay.createContainer(EntryPageContainer, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        _id
        title
        body
      }
    `,
  },
})
