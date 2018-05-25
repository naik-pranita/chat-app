var PATH = require('path');
var webpack = require('webpack');

var basePath = PATH.resolve(__dirname + '/src/');
var outputPath = PATH.resolve(__dirname + '/public/');

module.exports = {
    entry: {
        app: ['babel-polyfill', PATH.join(basePath + '/app.js')],
    },
    output: {
        filename: '[name].bundle.js',
        path: PATH.join(outputPath)
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.vendor.js',
            minChunks: function (module) {
                return module.context && module.context.includes('node_modules')
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_nodules/,
            loader: 'babel-loader',
            options: {
                compact: true
            }
        },
        {
            test: /\.(s*)css$/,
            exclude: /node_modules/,
            loaders: 'style-loader!css-loader!sass-loader'
        }]
    },
    resolve: {
        extensions: ['.js', '.es6']
    },
}
