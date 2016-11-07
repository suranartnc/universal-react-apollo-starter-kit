import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './PostItem.scss'

class PostItem extends Component {
  renderThumbnail = (post) => {
    if (post.thumbnail !== undefined) {
      return (
        <div className={styles.media}>
          <Link to={`/posts/${post._id}`}>
            <img src={post.thumbnail} alt="" />
          </Link>
        </div>
      )
    }
    return null
  }

  renderArticleBody() {
    const { post } = this.props

    return post._id
      ? <Link to={`/posts/${post._id}`}>{post.title}</Link>
      : <p>posting...</p>
  }

  render() {
    return (
      <article className={styles.article}>
        {this.renderArticleBody()}
      </article>
    )
  }
}

PostItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostItem
