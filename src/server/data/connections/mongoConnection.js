import { base64 } from 'graphql-relay/lib/utils/base64'

export function connectionFromMongooseModel(Model, args, filterMapper) {
  const {
    first,
    last,
    before,
    after,
    sort = '-_id',
    ...filter
  } = args

  const mappedFilter = mapFilter(filter, filterMapper)

  return Model.find(mappedFilter)
    .sort(sort)
    .limit(first)
    .then((posts) => {
      const edges = posts.map(post => ({
        cursor: generateCursor(post, sort),
        node: post,
      }))

      const pageInfo = generatePageInfo(edges)

      return {
        edges,
        pageInfo,
      }
    })
}

function mapFilter(filter, mapper) {
  if (typeof mapper !== 'function') {
    return filter
  }

  return mapper(filter)
}

function generateCursor(post, sort) {
  const sortField = sort.replace('-', '')
  const rawCursor = `${sortField}:${post[sortField]}`

  return base64(rawCursor)
}

function generatePageInfo(edges) {
  const pageInfo = {
    startCursor: null,
    endCursor: null,
    hasPreviousPage: false,
    hasNextPage: false,
  }

  const firstEdge = edges[0]
  const lastEdge = edges[edges.length - 1]

  if (firstEdge) {
    pageInfo.startCursor = firstEdge.cursor
  }

  if (lastEdge) {
    pageInfo.endCursor = lastEdge.cursor
  }

  return pageInfo
}
