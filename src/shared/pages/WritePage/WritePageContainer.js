import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import { withSubmitPost } from 'shared/modules/post/postActions'
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

    this.props.submit({
      title: title.value,
      body: body.value,
    }).then((res) => {
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

export default withRouter(withSubmitPost(WritePageContainer))
