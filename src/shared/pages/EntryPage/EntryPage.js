import React, { PropTypes } from 'react'
import styles from './EntryPage.scss'

function EntryPage({ post }) {
  return (
    <div>

    </div>
  )
}

EntryPage.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
}

export default EntryPage
