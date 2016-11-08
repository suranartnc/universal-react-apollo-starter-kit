import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import styles from './PostItem.scss'

const PostItem = ({ post, onClickLike }) => (
  <article className={styles.article}>
    <h1>
      <Link to={`/posts/${post._id}`}>{post.title}</Link>
    </h1>
    <div>
      <p>{post.likes} likes</p>
    </div>
    <div>
      <button type="button" onClick={onClickLike(post)}>Like</button>
    </div>
  </article>
)

PostItem.propTypes = {
  onClickLike: PropTypes.func.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.body,
    likes: PropTypes.number,
  }).isRequired,
}

export default PostItem
