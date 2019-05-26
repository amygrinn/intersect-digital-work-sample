module.exports = {
  css: {
    loaderOptions: {
      sass: {
        includePaths: ['src', 'node_modules'],
        data: `@import 'variables';\n`
      }
    }
  }
}