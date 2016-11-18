import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'shared/reducers'
import { routerMiddleware } from 'react-router-redux'
import authMiddleware from 'shared/middlewares/authMiddleware'

export default (client, history, initialState) => {
  const middlewares = [
    authMiddleware,
    routerMiddleware(history),
    client.middleware(),
  ]

  let enhancer = applyMiddleware(...middlewares)

  if (process.env.BROWSER && process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    enhancer = compose(enhancer, window.devToolsExtension())
  }

  const store = createStore(rootReducer(client), initialState, enhancer)

  if (module.hot) {
    module.hot.accept('shared/reducers', () => {
      const nextReducer = require('shared/reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
