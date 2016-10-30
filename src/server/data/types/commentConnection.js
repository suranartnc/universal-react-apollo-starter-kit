import { connectionDefinitions } from 'graphql-relay'

import commentType from './commentType'

export default connectionDefinitions({
  name: 'Comment',
  nodeType: commentType,
})
