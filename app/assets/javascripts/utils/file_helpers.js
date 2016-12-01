function readJSONFile(e, callback) {
  const files = e.target.files

  if (!files || !files[0]) {
    return
  }

  const reader = new FileReader()
  reader.onload = function(event) {
    console.log(event.target.result)
    callback(event.target.result)
  }
  reader.readAsText(files[0])
}

export {
  readJSONFile,
}
