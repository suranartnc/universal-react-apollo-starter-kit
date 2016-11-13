import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import { reducer as formReducer } from 'redux-form'

// import articleReducer from 'shared/modules/article/articleReducer'
// import memberReducer from 'shared/modules/member/memberReducer'
// import errorReducer from 'shared/system/reducers/errorReducer'

const rootReducer = client => combineReducers({
  routing: routerReducer,
  apollo: client.reducer(),
  // form: formReducer,
  // member: memberReducer,
  // article: articleReducer,
  // error: errorReducer
})

export default rootReducer
