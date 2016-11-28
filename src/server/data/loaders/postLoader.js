import DataLoader from 'dataloader'
import _ from 'lodash'

export default (PostModel) => {
  const postLoader = ids => {
    console.log(ids)
    return PostModel.find({ _id: { $in: ids } })
      .then(posts => (
        ids.map(id => _.find(posts, { id }))
      ))
  }

  return new DataLoader(postLoader)
}
