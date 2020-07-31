export default {
  mode: "spa",
  build: {
    extend(config, { isDev, isClient }) {
      if (!isDev)
        config.output.publicPath = "./_nuxt/"
      return config
    },
  },
  generate: {
    routes: [
      '/'
    ]
  },
  buildModules: ['@nuxtjs/router'],
  modules: ['nuxt-fontawesome', '@nuxtjs/markdownit', 'nuxt-webfontloader'],
  plugins: [
    '~/plugins/envInject.js',
    '~/plugins/hashPath.js',
    '~/plugins/smoothScroll.js',
    '~/plugins/codegen.js',
    '~/plugins/highlight.js'
  ],
  markdownit: {
    injected: true,
    use: [
      'markdown-it-highlightjs'
    ]
  },
  webfontloader: {
    google: {
      families: ['Montserrat:200,400','Roboto:400,700','Source Code Pro:400']
    }
  },
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['faChevronDown', 'faCog', 'faHeart']
      },
    ]
  },
}
