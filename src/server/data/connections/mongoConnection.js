import { base64 } from 'graphql-relay/lib/utils/base64'
import { connectionArgs } from 'graphql-relay'
import mongoSortEnumType from '../types/enum/mongoSortEnumType'

export const connectionIdentifierArgs = {
  ...connectionArgs,
  last: {
    ...connectionArgs.last,
    defaultValue: 10,
  },
  first: {
    ...connectionArgs.first,
    defaultValue: 10,
  },
  sort: {
    type: mongoSortEnumType,
    defaultValue: '-1',
  },
}

function sanitizeFilter(filter, sanitizer) {
  if (typeof sanitizer !== 'function') {
    return filter
  }

  return sanitizer(filter)
}

const CURSOR_SEPERATOR = '---'

function identifierToCursor(item, identifier = '_id') {
  const cursor = `${identifier}${CURSOR_SEPERATOR}${item[identifier]}`
  return base64(cursor)
}

function createEdgesFromItems(items, cursorGenerator) {
  return items.map(item => ({
    node: item,
    cursor: cursorGenerator(item),
  }))
}

function getBeforeOperator(sort) {
  return parseFloat(sort) > 0 ? '$lt' : '$gt'
}

function getAfterOperator(sort) {
  return parseFloat(sort) > 0 ? '$gt' : '$lt'
}

export function connectionFromMongooseIdentifier(Model, args, filterSanitizer) {
  const {
    first,
    last,
    before,
    after,
    sort,
    ...filter
  } = args

  const sanitizedFilter = sanitizeFilter(filter, filterSanitizer)

  return Model.find(sanitizedFilter)
    .sort({ _id: sort })
    .limit(first)
    .then((items) => {
      const edges = createEdgesFromItems(items, identifierToCursor)

      const firstEdge = edges[0]
      const lastEdge = edges[edges.length - 1]

      let findPrev = null
      let findNext = null

      if (firstEdge) {
        const beforeOperator = getBeforeOperator(sort)
        findPrev = Model.findOne({
          ...sanitizedFilter,
          _id: { [beforeOperator]: firstEdge.node._id },
        })
      }

      if (lastEdge) {
        const afterOperator = getAfterOperator(sort)
        findNext = Model.findOne({
          ...sanitizedFilter,
          _id: { [afterOperator]: lastEdge.node._id },
        })
      }

      return Promise.all([findPrev, findNext])
        .then(([prev, next]) => ({
          edges,
          pageInfo: {
            startCursor: firstEdge.cursor,
            endCursor: lastEdge.cursor,
            hasNextPage: !!next,
            hasPreviousPage: !!prev,
          },
        }))
    })
}
