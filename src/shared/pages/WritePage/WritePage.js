import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const renderErrors = (errors) => {
  const messages = errors.map(error => error.message)
  return (
    <div>
      {messages.join(', ')}
    </div>
  )
}

const renderButtons = (isSumitting) => {
  if (isSumitting) {
    return <p>Posting</p>
  }

  return (
    <div>
      <button type="submit">Summit</button>
      <Link to={'/'}>Cancel</Link>
    </div>
  )
}

const WritePage = ({ onSubmit, submitting, errors }) => (
  <form onSubmit={onSubmit}>
    {errors && renderErrors(errors)}

    <div>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" />
    </div>

    <div>
      <label htmlFor="body">Body</label>
      <textarea name="body" id="body" cols="50" rows="5" />
    </div>

    {renderButtons(submitting)}
  </form>
)

WritePage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.String,
  }),
}

export default WritePage
