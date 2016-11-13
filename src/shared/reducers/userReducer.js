import {
  MEMBER_SIGNUP,
  MEMBER_LOGIN,
  MEMBER_LOGOUT,
} from 'shared/actions/userActions'

export const initialState = {
  isAuthenticated: false,
  user: {},
}

export default (state = initialState, action) => {
  // console.log('action dispatched', action)
  switch (action.type) {

    case `${MEMBER_SIGNUP}_SUCCESS`:
    case `${MEMBER_LOGIN}_SUCCESS`:
      console.log({
        ...state,
        isAuthenticated: true,
        user: action.data.user,
      })
      return {
        ...state,
        isAuthenticated: true,
        user: action.data.user,
      }

    case MEMBER_LOGOUT:
      return initialState

    default:
      return state
  }
}
