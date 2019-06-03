const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ZipPlugin = require('zip-webpack-plugin');

class CopyIndexOutputFile {

  constructor(...filenames) {
    this.filenames = filenames
  }

  apply(compiler) {
    compiler.hooks.emit.tap('COPY_INDEX_OUTPUT_FILE', compilation => {
      if(compilation.assets['index.html']) {
        this.filenames.forEach(filename => {
          compilation.assets[filename] = compilation.assets['index.html']
        })
      }
    })
  }
}

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
      new CopyIndexOutputFile('200.html'),
      new ZipPlugin({filename: 'work-sample-tyler-grinn.zip'})
    ]
  }
}
