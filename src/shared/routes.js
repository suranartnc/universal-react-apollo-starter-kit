import React from 'react'
import Relay from 'react-relay'
import { Route, IndexRoute } from 'react-router'

import App from 'shared/pages/App/App'
import FullLayout from 'shared/pages/App/FullLayout/FullLayout'

import HomePageContainer from 'shared/pages/HomePage/HomePageContainer'

const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` }

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <Route component={FullLayout}>
        <IndexRoute component={HomePageContainer} queries={ViewerQueries} />
      </Route>
    </Route>
  )
}
