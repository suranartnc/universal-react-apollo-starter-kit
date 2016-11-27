import postType from '../types/postType'

export const postAddedSubscription = {
  type: postType,
  description: 'When a new post has been added',
  resolve: (post) => {
    return post
  },
}
