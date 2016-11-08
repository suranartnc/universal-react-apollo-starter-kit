import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import WritePage from './Writepage'

class WritePageContainer extends Component {
  state = {
    submitting: false,
    errors: null,
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      submitting: true,
      errors: null,
    })

    const { title, body } = e.target

    this.props.submit(
      title.value,
      body.value
    ).then((res) => {
      if (res.errors) {
        return this.onSubmitError(res.errors)
      }

      return this.props.router.push('/')
    }).catch(err => this.onSubmitError([err]))
  }

  onSubmitError = (errors) => {
    this.setState({
      submitting: false,
      errors,
    })
    return
  }

  render() {
    return (
      <WritePage
        onSubmit={this.onSubmit}
        submitting={this.state.submitting}
        errors={this.state.errors}
      />
    )
  }
}

WritePageContainer.propTypes = {
  router: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  submit: PropTypes.func.isRequired,
}

const SUBMIT_POST_MUTATION = gql`
  mutation addPost($title: String!, $body: String!) {
    addPost(title: $title, body: $body, categories: [], userId: "5805c26198f0370001ac64a3") {
      _id,
      title,
      body
    }
  }
`

const submit = mutate => (title, body) => mutate({
  variables: { title, body },
})

const withSubmitPost = graphql(SUBMIT_POST_MUTATION, {
  props: ({ mutate }) => ({
    submit: submit(mutate),
  }),
})

export default withSubmitPost(withRouter(WritePageContainer))
