import { connectionDefinitions } from 'graphql-relay'
import postType from '../types/postType'

const postConnection = connectionDefinitions({
  nodeType: postType,
  description: 'connection of posts',
  resolveNode: (node, args) => {
    console.log(node, args)
    return node
  },
})

export default postConnection
