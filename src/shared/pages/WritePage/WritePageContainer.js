import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import WritePage from './Writepage'

class WritePageContainer extends Component {
  state = {
    errors: null,
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { title, body } = e.target

    this.props.submit(
      title.value,
      body.value
    ).then((res) => {
      if (res.errors) {
        this.setState({
          errors: res.errors,
        })

        return
      }

      this.props.router.push('/')
    })
  }

  render() {
    return <WritePage onSubmit={this.onSubmit} errors={this.state.errors} />
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

const submitHandler = mutate => (title, body) => mutate({
  variables: { title, body },
  updateQueries: {
    getPosts: (prev, { mutationResult }) => ({
      viewer: {
        ...prev.viewer,
        posts: [
          mutationResult.data.addPost,
          ...prev.viewer.posts,
        ],
      },
    }),
  },
})

const prepProps = ({ mutate }) => ({
  submit: submitHandler(mutate),
})

export default graphql(SUBMIT_POST_MUTATION, {
  props: prepProps,
})(withRouter(WritePageContainer))
