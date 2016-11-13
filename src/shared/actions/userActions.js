export const MEMBER_SIGNUP = 'MEMBER_SIGNUP'
export const MEMBER_LOGIN = 'MEMBER_LOGIN'
export const MEMBER_LOGOUT = 'MEMBER_LOGOUT'
export const MEMBER_LOAD_AUTH = 'MEMBER_LOAD_AUTH'

export function memberSignup(data) {
  return {
    type: MEMBER_SIGNUP,
    data,
    request: {
      path: '/signup',
      options: {
        method: 'POST',
        body: data,
      }
    }
  }
}

export function memberLogin(data) {
  return {
    type: MEMBER_LOGIN,
    data,
    request: {
      path: '/login',
      options: {
        method: 'POST',
        body: data,
      }
    }
  }
}

export function memberLogout() {
  return {
    type: MEMBER_LOGOUT,
  }
}
