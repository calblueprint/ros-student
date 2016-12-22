function findById(objects, object) {
  return objects.find((element) => {
    if (typeof object === 'number') {
      return element.id === object
    }

    return element.id === object.id
  })
}

function isFirst(object) {
  return object.position == 1
}

function isLast(objects, object) {
  return object.position == objects.length
}

export {
  findById,
  isFirst,
  isLast,
}
