const { join } = require('path')

module.exports = {
    entry: ['./client/index.js'],
    mode: 'development',
    output: {
        path: join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    context: __dirname,
    devtool: 'source-maps',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}