export default (context, inject) => {
  const hashPath = (path, method) => {
    path = path.replace(/[^a-zA-Z0-9_-]+/g, "-")
    let hash = `${method}-${path}`
    return hash.replace(/-+$/g, "").toLowerCase()
  }

  inject('hashPath', hashPath)
  context.$hashPath = hashPath
}
