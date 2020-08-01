const addSaneDefaults = api => {
  api.info = {
    title: "Untitled",
    version: "0.0.0",
    description: "",
    ...api.info
  }
}

const addPathMethodAndDefaultTags = api => {
  for(let path in api.paths) {
    for(let method in api.paths[path]) {
      const def = api.paths[path][method]
      def.path = path
      def.method = method

      if(typeof def.tags !== 'array' || def.tags.length == 0) {
        def.tags = ['default']
        if(api.tags.filter(t => t.name == 'default').length == 0)
          api.tags.push({ name: "default" })
      }
    }
  }
}

const addPathsToTags = api => {
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
}

export default (context, inject) => {
  const config = {
    i18n: {},
    ...(process.env.config || {})
  }

  const api = {
    info: {},
    servers: [],
    security: [],
    paths: {},
    tags: [],
    externalDocs: [],
    components: {},
    ...(process.env.api || {})
  }

  addSaneDefaults(api)
  addPathMethodAndDefaultTags(api)
  addPathsToTags(api)

  inject('api',    api)
  inject('config', config)
  inject('i18n',   key => config.i18n[key] || key)

  console.log(`API name: ${api.info.title}, Version: ${api.info.version}`)
}
