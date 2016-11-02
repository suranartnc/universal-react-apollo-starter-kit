import React, { PropTypes } from 'react'
import PostItem from '../PostItem/PostItem'
import styles from './PostList.scss'

function PostList({ posts }) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {posts.map(post => (
          <li key={post._id} className={styles.item}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default PostList
