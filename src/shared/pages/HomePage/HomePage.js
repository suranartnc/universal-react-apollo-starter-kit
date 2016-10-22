import React, { PropTypes } from 'react'

import PostList from 'shared/components/Post/PostList/PostList'

function Homepage({ posts }) {
  return (
    <PostList posts={posts} />
  )
}

Homepage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default Homepage
