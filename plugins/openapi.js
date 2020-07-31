export default (context, inject) => {
  let api = process.env.api || {}

  for(let path in api.paths) {
    for(let method in api.paths[path]) {
      const def = api.paths[path][method]
      def.path = path
      def.method = method
    }
  }

  api.tags.forEach(tag => {
    tag.paths = {}
    for(let path in api.paths) {
      for(let method in api.paths[path]) {
        const def = api.paths[path][method]
        if(def.tags.indexOf(tag.name) !== -1) {
          if(tag.paths[path] == undefined)
            tag.paths[path] = {}
          tag.paths[path][method] = def
        }
      }
    }
  })

  console.log(`API name: ${api.info.title}, Version: ${api.info.version}`)
  console.log(api);

  inject('api', api)
  context.$api = api
}
