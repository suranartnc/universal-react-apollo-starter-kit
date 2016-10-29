// import {
//   fromGlobalId,
//   nodeDefinitions,
// } from 'graphql-relay'

// import PostModel from '../models/PostModel'

// import postType from '../types/postType'

// const nodeMeta = nodeDefinitions(
//   (globalId) => {
//     const { type, id } = fromGlobalId(globalId)
//     switch (type) {
//       case 'Post':
//         return PostModel.findById(id)
//       default:
//         return null
//     }
//   },
//   (obj) => {
//     switch (obj.type) {
//       case 'Post':
//         return postType
//       default:
//         return null
//     }
//   }
// )

// export default nodeMeta
