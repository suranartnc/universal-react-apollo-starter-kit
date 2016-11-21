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

export const LIKE_POST_MUTATION = gql`
  mutation likePost($id: String!) {
    likePost(_id: $id) {
      _id
      likes
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
