function getImages() {
  const images = document.querySelector('meta[name="images"]')
  if (!images) {
    return {}
  }
  return JSON.parse(images.content)
}

function convertImage(e, onLoad) {
  const files = e.target.files
  if (!files || !files[0]) {
    return
  }

  // FileReader decodes into a base64 string.
  const reader = new FileReader()
  reader.onload = (file) => {
    onLoad(file.target.result)
  }

  reader.readAsDataURL(files[0])
}

const Images = getImages()

export {
  Images,
  convertImage,
}
