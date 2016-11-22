import React, { PropTypes } from 'react'

import PostList from 'shared/components/Post/PostList/PostList'

function Homepage({ posts, loadMore, onClickLike, onClickDelete }) {
  return (
    <div>
      <PostList posts={posts} onClickLike={onClickLike} onClickDelete={onClickDelete} />
      <button onClick={loadMore}>Load more</button>
    </div>
  )
}

Homepage.propTypes = {
  ...PostList.propTypes,
  loadMore: PropTypes.func.isRequired,
}

export default Homepage
