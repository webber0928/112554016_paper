import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UsernameKey = 'username'
const Time = 'time'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUsername() {
  return Cookies.get(UsernameKey)
}

export function setUsername(username) {
  return Cookies.set(UsernameKey, username)
}

export function removeUsername() {
  return Cookies.remove(UsernameKey)
}

export function setTime(time) {
  return Cookies.set(Time, time)
}
export function getTime() {
  return Cookies.get(Time)
}
