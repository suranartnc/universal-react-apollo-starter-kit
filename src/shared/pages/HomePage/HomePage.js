import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import PostList from 'shared/components/Post/PostList/PostList'

function Homepage({ posts, loadMorePosts, onClickLike, onClickDelete }) {
  return (
    <div>
      <Link to={'write'}>Add Post</Link>
      <PostList posts={posts} onClickLike={onClickLike} onClickDelete={onClickDelete} />
      <button onClick={loadMorePosts}>Load more</button>
    </div>
  )
}

Homepage.propTypes = {
  loadMorePosts: PropTypes.func.isRequired,
  onClickLike: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
      likes: PropTypes.number,
    })
  ),
}

export default Homepage
