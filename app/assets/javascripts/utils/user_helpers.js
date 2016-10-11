function getUser() {
  const userJson = document.querySelector('meta[name="user"]').content
  return JSON.parse(userJson)
}

function setUser(user) {
  document.querySelector('meta[name="user"]').setAttribute('content', JSON.stringify(user))
}

export {
  getUser,
  setUser
}
