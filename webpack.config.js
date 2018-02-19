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
        path: PATH.join(outputPath + '/build/')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_nodules/,
            loader: 'babel-loader'
        }]
    },
    devServer: {
        contentBase: outputPath,
        compress: true,
        port: 9000,
        hot: true
    },
    resolve: {
        extensions: ['.js', '.es6']
    },
}
