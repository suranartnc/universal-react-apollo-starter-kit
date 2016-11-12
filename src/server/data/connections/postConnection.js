import { connectionDefinitions } from 'graphql-relay'
import postType from '../types/postType'

const postConnectionName = 'PostConnection'

const postConnection = connectionDefinitions({
  nodeType: postType,
  description: 'connection of posts',
})

export default postConnection
