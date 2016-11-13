import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

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


const GET_POST = gql`
  query getPost($id: String!) {
    viewer {
      post(_id: $id) {
        _id
        title
        body
      }
    }
  }
`

export default graphql(GET_POST, {
  options: ({ params }) => {
    return {
      variables: {
        id: params.id,
      },
    }
  },
})(EntryPageContainer)
