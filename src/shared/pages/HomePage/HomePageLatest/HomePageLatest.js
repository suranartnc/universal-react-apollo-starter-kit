import React, { PropTypes } from 'react'

import PostList from 'shared/components/Post/PostList/PostList'

function HomepageLatest({ posts }) {
  return (
    <PostList posts={posts} />
  )
}

HomepageLatest.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default HomepageLatest
