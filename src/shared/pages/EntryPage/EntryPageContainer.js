import React, { Component, PropTypes } from 'react'
import { withPost } from 'shared/modules/post/postActions'

import EntryPage from './EntryPage'

class EntryPageContainer extends Component {
  render() {
    if (!this.props.data.loading) {
      return (
        <EntryPage post={this.props.data.viewer.post} />
      )
    }
    return <div>Loading...</div>
  }
}

EntryPageContainer.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
}

export default withPost(params => params.id)(EntryPageContainer)
