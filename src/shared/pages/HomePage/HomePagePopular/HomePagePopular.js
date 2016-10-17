import React, { PropTypes } from 'react'

import PostList from 'shared/components/Post/PostList/PostList'

function HomePagePopular({ posts }) {
  return (
    <PostList posts={posts} />
  )
}

HomePagePopular.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default HomePagePopular
