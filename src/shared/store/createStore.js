import { createStore } from 'redux'
import rootReducer from 'shared/reducers'

export default (client, initialState) => {
  const store = createStore(rootReducer(client), initialState)
  return store
}
