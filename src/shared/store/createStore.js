import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'shared/reducers'
import { routerMiddleware } from 'react-router-redux'

export default (client, history, initialState) => {
  const middlewares = [
    routerMiddleware(history),
    client.middleware(),
  ]

  let enhancer = applyMiddleware(...middlewares)

  if (process.env.BROWSER && process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    enhancer = compose(enhancer, window.devToolsExtension())
  }

  const store = createStore(rootReducer(client), initialState, enhancer)
  return store
}
