module.exports = {
    entry: "./index.js",
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/dist',
        filename: "bundle.js"
    },
    module: {
      rules: [
         {
           test: /\.jsx?$/,
           use: ['babel-loader']
         },
         {
          test: /\.gif$/,
          loader: 'url-loader'
         },
      ]
    }
}
