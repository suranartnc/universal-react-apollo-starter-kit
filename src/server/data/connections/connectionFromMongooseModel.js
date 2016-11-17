import _ from 'lodash'
import { base64 } from 'graphql-relay/lib/utils/base64'

function validateLimit(first, last) {
  if (!first && !last) {
    throw new Error('You must provide a `first` or `last` value to properly paginate the connection')
  }

  if (first && last) {
    throw new Error('Passing both `first` and `last` values to paginate the connection is not supported')
  }

  const maxLimit = 30
  const exceedMessage = _.template(`Requesting <%= limit %> records on the connection exceeds the <%= variableName %> limit of ${maxLimit} records`)

  if (first > maxLimit) {
    throw new Error(exceedMessage({
      limit: first,
      variableName: 'first',
    }))
  }

  if (last > maxLimit) {
    throw new Error(exceedMessage({
      limit: last,
      variableName: 'last',
    }))
  }
}

function encodeCursor(value) {
  return base64(`${value}`)
}

export default function connectionFromMongooseModel(Model, args) {
  const {
    before,
    after,
    first,
    last,
  } = args

  validateLimit(first, last)

  return Model.find().count()
    .then((total) => {
      const query = Model.find().sort({ _id: -1 })

      if (last) {
        query.skip(total - last)
      }

      if (first) {
        query.limit(first)
      }

      return query.then((nodes) => {
        const edges = nodes.map(node => ({
          node,
          cursor: encodeCursor(node._id),
        }))

        return {
          edges,
          pageInfo: {
            startCursor: null,
            endCursor: null,
            hasNextPage: false,
            hasPreviousPage: false,
          },
        }
      })
    })
}
