import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const WritePage = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" />
    </div>

    <div>
      <label htmlFor="body">Body</label>
      <textarea name="body" id="body" cols="50" rows="5" />
    </div>

    <button type="submit">Summit</button>
    <Link to={'/'}>Cancel</Link>
  </form>
)

WritePage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default WritePage
