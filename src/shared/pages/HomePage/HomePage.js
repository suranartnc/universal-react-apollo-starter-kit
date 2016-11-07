import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import PostList from 'shared/components/Post/PostList/PostList'

function Homepage({ posts, loadMorePosts }) {
  return (
    <div>
      <Link to={'write'}>Add Post</Link>
      <PostList posts={posts} />
      <button onClick={loadMorePosts}>Load more</button>
    </div>
  )
}

Homepage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default Homepage
