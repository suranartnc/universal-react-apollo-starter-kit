import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import PostList from 'shared/components/Post/PostList/PostList'

function Homepage({ posts }) {
  return (
    <div>
      <Link to={'write'}>Add Post</Link>
      <PostList posts={posts} />
    </div>
  )
}

Homepage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default Homepage
