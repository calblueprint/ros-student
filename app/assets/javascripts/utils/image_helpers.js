function getImages() {
  const images = document.querySelector('meta[name="images"]')
  if (!images) {
    return {}
  }
  return JSON.parse(images.content)
}

const Images = getImages()

export {
  Images,
}
