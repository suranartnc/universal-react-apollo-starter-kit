import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Root from 'shared/Root'

const mountNode = document.getElementById('root')

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  mountNode
)

if (module.hot) {
  module.hot.accept('shared/Root', () => {
    const NextRootApp = require('shared/Root').default

    render(
      <AppContainer>
        <NextRootApp />
      </AppContainer>,
      mountNode
    )
  })
}
