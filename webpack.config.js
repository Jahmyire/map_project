const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

require('dotenv').config();

module.exports = {
    mode: 'production',
    devServer: {
        static: './dist'
    },
    entry: {
        main: './src/js/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, use: [ 'style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'The Amazing Airport Visualizer',
            template: './src/index.html',
            apiKey: process.env.API_KEY,
            minify: {
                collapseWhitespace: true
            }
        })
    ]
};