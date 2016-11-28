import DataLoader from 'dataloader'
import _ from 'lodash'

function createGetPostById({ postIdsLoader }) {
  return id => postIdsLoader.load(id)
}

function postLoader(deps) {
  return {
    getPostById: createGetPostById(deps),
  }
}

function createPostIdsLoader(model) {
  return new DataLoader((ids) => {
    console.log(ids)
    return model.find({ _id: { $in: ids } })
      .then(posts => (
        ids.map(id => _.find(posts, { id }))
      ))
  })
}

const withLoaders = initFn => (deps) => {
  const postIdsLoader = createPostIdsLoader(deps.model)

  return initFn({
    ...deps,
    postIdsLoader,
  })
}

export default withLoaders(postLoader)
