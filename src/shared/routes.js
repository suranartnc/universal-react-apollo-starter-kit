import React from 'react'
import Relay from 'react-relay'
import { Route, IndexRedirect } from 'react-router'

import App from 'shared/pages/App/App'
import FullLayout from 'shared/pages/App/FullLayout/FullLayout'

import HomePageLatestContainer from 'shared/pages/HomePage/HomePageLatest/HomePageLatestContainer'
import EntryPageContainer from 'shared/pages/EntryPage/EntryPageContainer'

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require)
  }
}

const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` }

export default function getRoutes() {
  return (
    <Route path="/" component={App}>

      <IndexRedirect to="/latest" />

      <Route component={FullLayout}>
        <Route path="latest" component={HomePageLatestContainer} queries={ViewerQueries} />
        <Route path="posts/:id" component={EntryPageContainer} />
      </Route>

    </Route>
  )
}
