import createPostLoader from './createPostLoader'

export default ({ authUser, PostModel }) => ({
  postLoader: createPostLoader({ authUser, model: PostModel }),
})
