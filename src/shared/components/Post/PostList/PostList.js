import React, { PropTypes } from 'react'
import PostItem from '../PostItem/PostItem'
import styles from './PostList.scss'

function PostList({ posts, onClickLike, onClickDelete }) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {posts.map(post => (
          <li key={post._id} className={styles.item}>
            <PostItem post={post} onClickLike={onClickLike} onClickDelete={onClickDelete} />
          </li>
        ))}
      </ul>
    </div>
  )
}

PostList.propTypes = {
  onClickLike: PostItem.propTypes.onClickLike,
  onClickDelete: PostItem.propTypes.onClickLike,
  posts: PropTypes.arrayOf(PostItem.propTypes.post),
}

export default PostList
