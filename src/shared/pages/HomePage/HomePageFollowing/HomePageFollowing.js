import React, { PropTypes } from 'react'

import PostList from 'shared/components/Post/PostList/PostList'

function HomePageFollowing({ posts }) {
  return (
    <PostList posts={posts} />
  )
}

HomePageFollowing.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default HomePageFollowing
