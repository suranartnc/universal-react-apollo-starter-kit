import React, { Component, PropTypes } from 'react'
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

export default EntryPageContainer
