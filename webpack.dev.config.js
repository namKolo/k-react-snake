var path = require('path');

module.exports = {
  entry: [ path.join(__dirname, 'src/js/index') ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.json?$/,
      loaders: ['json'],
      include: path.join(__dirname, 'src')
    }]
  },
  resolve: {
    extensions: [ '', '.jsx', '.js' ],
    modulesDirectories: [ 'node_modules', 'src/js' ]
  }
};
