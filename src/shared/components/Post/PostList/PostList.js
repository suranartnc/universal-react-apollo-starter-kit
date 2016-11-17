import React, { PropTypes } from 'react'
import PostItem from '../PostItem/PostItem'

function PostList({ posts, onClickLike, onClickDelete }) {
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
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
