import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { ViewerQueries, PostQueries } from 'shared/relay/queries'

import App from 'shared/pages/App/App'
import FullLayout from 'shared/pages/App/FullLayout/FullLayout'

import HomePageContainer from 'shared/pages/HomePage/HomePageContainer'
import EntryPageContainer from 'shared/pages/EntryPage/EntryPageContainer'

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
