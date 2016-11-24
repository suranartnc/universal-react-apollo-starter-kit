import React, { PropTypes } from 'react'
import { Link } from 'react-router'

function PostItem({ post, onClickLike, onClickDelete }) {
  const likeButton = post.haveLiked
    ? <button type="button" onClick={onClickLike(post)}>Unlike</button>
    : <button type="button" onClick={onClickLike(post)}>Like</button>

  return (
    <article>
      <Link to={`/posts/${post._id}`}>
        {post.thumbnail && (
          <div>
            <img src={post.thumbnail} alt={post.title} width="257px" />
          </div>
        )}

        <div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </Link>
      <footer>
        <div>
          <p>{post.likes} likes</p>
        </div>
        <div>
          {likeButton}
          <button type="button" onClick={onClickDelete(post)}>Delete</button>
        </div>
      </footer>
    </article>
  )
}

PostItem.propTypes = {
  onClickLike: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.body,
    likes: PropTypes.number,
    haveLiked: PropTypes.bool,
  }).isRequired,
}

export default PostItem
