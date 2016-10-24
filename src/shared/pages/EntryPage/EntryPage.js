import React, { PropTypes } from 'react'
import styles from './EntryPage.scss'

function EntryPage({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  )
}

EntryPage.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
}

export default EntryPage
