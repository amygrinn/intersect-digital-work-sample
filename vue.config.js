const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ZipPlugin = require('zip-webpack-plugin');
const SurgeSPAPlugin = require('./webpack-plugins/surge-spa-plugin')

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
      }),
      new SurgeSPAPlugin(),
      new ZipPlugin({filename: 'work-sample-tyler-grinn.zip'})
    ]
  }
}
