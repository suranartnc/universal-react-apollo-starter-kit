import fetch from 'isomorphic-fetch'

import config from 'shared/configs'

const graphqlServer = `http://${config.apiHost}${config.isProduction === false ? `:${config.port}` : ''}/graphql`

const graphQLFetcher = (graphQLParams) => {
  return new Promise((resolve, reject) => {
    fetch(graphqlServer, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: graphQLParams,
      }),
    })
    .then(response => resolve(response.json()))
    .catch(error => reject(error))
  })
}

export default graphQLFetcher
