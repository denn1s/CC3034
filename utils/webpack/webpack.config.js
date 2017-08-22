module.exports = {
    entry: "./entry.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
		            test: /\.css$/,
                use: [
                  {
                     loader: 'style-loader'
                  },
                  {
                     loader: 'css-loader'
                  }
                ]
            }
        ]
    }
};
