import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'shared/pages/App/App'
import FullLayout from 'shared/pages/App/FullLayout/FullLayout'

import HomePageContainer from 'shared/pages/HomePage/HomePageContainer'
import EntryPageContainer from 'shared/pages/EntryPage/EntryPageContainer'
import WritePageContainer from 'shared/pages/WritePage/WritePageContainer'
import LoginPageContainer from 'shared/pages/LoginPage/LoginPageContainer'
import RegisterPageContainer from 'shared/pages/RegisterPage/RegisterPageContainer'

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <Route component={FullLayout}>
        <IndexRoute component={HomePageContainer} />
        <Route path="posts/:id" component={EntryPageContainer} />
        <Route path="write" component={WritePageContainer} />
        <Route path="login" component={LoginPageContainer} />
        <Route path="signup" component={RegisterPageContainer} />
      </Route>
    </Route>
  )
}
