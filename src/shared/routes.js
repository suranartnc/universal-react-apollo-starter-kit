import React from 'react'
import Relay from 'react-relay'
import { Route, IndexRoute } from 'react-router'

import App from 'shared/pages/App/App'
import FullLayout from 'shared/pages/App/FullLayout/FullLayout'

import HomePageContainer from 'shared/pages/HomePage/HomePageContainer'
import EntryPageContainer from 'shared/pages/EntryPage/EntryPageContainer'

const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` }
const PostQueries = { post: () => Relay.QL`query { post(_id: $id) }` }

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <Route component={FullLayout}>
        <IndexRoute component={HomePageContainer} queries={ViewerQueries} />
        <Route path="posts/:id" component={EntryPageContainer} queries={PostQueries} />
      </Route>
    </Route>
  )
}
