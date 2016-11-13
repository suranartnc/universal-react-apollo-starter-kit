import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'

const rootReducer = client => combineReducers({
  routing: routerReducer,
  apollo: client.reducer(),
  user: userReducer,
})

export default rootReducer
