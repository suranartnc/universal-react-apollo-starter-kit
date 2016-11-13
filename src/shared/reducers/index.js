import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = client => combineReducers({
  routing: routerReducer,
  apollo: client.reducer(),
})

export default rootReducer
