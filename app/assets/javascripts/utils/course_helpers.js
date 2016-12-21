function findById(objects, object) {
  return objects.find((element) => element.id === object.id)
}

export {
  findById,
}
