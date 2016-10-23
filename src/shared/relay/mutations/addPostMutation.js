import Relay from 'react-relay'

class AddPostMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { addPost }
    `
  }

  getVariables() {
    return {
      title: this.props.title,
      body: this.props.body,
      userId: this.props.viewerId,
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddPostPayload {
        postEdge,
        viewer { posts }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'posts',
      edgeName: 'postEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }
}

export default AddPostMutation
