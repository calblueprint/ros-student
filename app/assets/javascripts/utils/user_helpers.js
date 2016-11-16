const CONFIG = { attributes: true, childList: true, characterData: true }

function observeUser(callback) {
  const observer = new MutationObserver(callback)
  const target = document.querySelector('meta[name="user"]')
  observer.observe(target, CONFIG)
  return observer
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
