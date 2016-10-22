import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './PostItem.scss'

class PostItem extends Component {
  renderThumbnail = (post) => {
    if (post.thumbnail !== undefined) {
      return (
        <div className={styles.media}>
          <Link to={`/posts/${post.id}`}>
            <img src={post.thumbnail} alt="" />
          </Link>
        </div>
      )
    }
    return null
  }

  render() {
    const { post } = this.props
    return (
      <article className={styles.article}>
        {post.title}
      </article>
    )
  }
}

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostItem
