import { createObserver } from '../observer'

function observeUser(callback) {
  return createObserver(callback, 'meta[name="user"]')
}

function getUser() {
  const userJson = document.querySelector('meta[name="user"]').content
  return JSON.parse(userJson)
}

function setUser(user) {
  document.querySelector('meta[name="user"]').setAttribute('content', JSON.stringify(user))
}

export {
  observeUser,
  getUser,
  setUser,
}
