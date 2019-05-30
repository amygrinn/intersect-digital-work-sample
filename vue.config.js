const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        includePaths: ['src', 'node_modules'],
        data: `@import 'variables';\n`
      }
    }
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      })
    ]
  }
}