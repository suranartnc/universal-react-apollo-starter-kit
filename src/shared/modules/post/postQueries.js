import gql from 'graphql-tag'

export const GET_POSTS = gql`
  query getPosts($limit: Int, $after: String) {
    viewer {
      posts(first: $limit, after: $after) {
        edges {
          node {
            _id
            title
            excerpt
            thumbnail
            likes
            haveLiked
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

export const GET_POST = gql`
  query getPost($id: String!) {
    viewer {
      post(_id: $id) {
        _id
        title
        body
      }
    }
  }
`

export const LIKE_POST_MUTATION = gql`
  mutation likePost($id: String!, $action: LikePostMutationAction!) {
    likePost(_id: $id, action: $action) {
      _id
      likes
      haveLiked
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: String!) {
    deletePost(_id: $id) {
      _id
    }
  }
`

export const SUBMIT_POST_MUTATION = gql`
  mutation addPost($title: String!, $body: String!) {
    addPost(title: $title, body: $body, categories: []) {
      _id,
      title,
      body
    }
  }
`

export const NEW_POSTS_SUBSCRIPTION = gql`
  subscription newPosts {
    postAdded {
      _id
      excerpt
      haveLiked
      likes
      thumbnail
      title
    }
  }
`
