var config = {
  entry: './main.js',

  output: {
    path: './',
    filename: 'index.js'
  },

 
  devServer: {
    inline: true,
    port: 7778
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {test: /\.json$/, loader: "json"}
    ]
  }
}

module.exports = config;