const CONFIG = { attributes: true, childList: true, characterData: true }

function createObserver(callback, tag) {
  const observer = new MutationObserver(callback)
  const target = document.querySelector(tag)
  observer.observe(target, CONFIG)
  return observer
}

export {
  createObserver,
}
