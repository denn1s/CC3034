module.exports = {
    entry: "./index.js",
    output: {
        path: `${__dirname}/dist`,
        filename: "bundle.js"
    },
    module: {
      rules: [
         {
           test: /\.jsx?$/,
           use: ['babel-loader']
         }
      ]
    }
}
