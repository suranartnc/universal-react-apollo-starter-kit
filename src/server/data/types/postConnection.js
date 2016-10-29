import { connectionDefinitions } from 'graphql-relay'

import postType from './postType'

export default connectionDefinitions({
  name: 'Post',
  nodeType: postType,
})
