function getUser() {
  const userJson = document.querySelector('meta[name="user"]').content
  return JSON.parse(userJson)
}
