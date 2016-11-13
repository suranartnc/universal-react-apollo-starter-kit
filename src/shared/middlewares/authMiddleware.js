import {
  MEMBER_LOAD_AUTH,
  MEMBER_SIGNUP,
  MEMBER_LOGIN,
  MEMBER_LOGOUT,
} from 'shared/actions/userActions'

import jwtDecode from 'jwt-decode'
import reactCookie from 'react-cookie'

export default store => next => action => {
  const { type, callback } = action

  switch (type) {

    case `${MEMBER_SIGNUP}_SUCCESS`:
    case `${MEMBER_LOGIN}_SUCCESS`:
      reactCookie.save('AUTH_TOKEN', action.data.token)
      const user = jwtDecode(action.data.token)
      user.token = action.data.token
      action.data.user = user
      return next(action)

    case MEMBER_LOGOUT:
      reactCookie.remove('AUTH_TOKEN')
      return next(action)

    case MEMBER_LOAD_AUTH:
      let result = false
      const token = reactCookie.load('AUTH_TOKEN')
      if (token) {
        const user = jwtDecode(token)
        user.token = token
        action.data = {user}
        result = next({ ...action, type: `${MEMBER_LOGIN}_SUCCESS` })
      }
      return result

    default:
      return next(action)
  }
}
