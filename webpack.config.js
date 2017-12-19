const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');


var isProd = process.env.NODE_ENV === 'production'; //true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
})
var cssConfig = isProd ? cssProd : cssDev;



module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
            // filename: './dist/app.bundle.js'
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(jpe?g|PNG|png|gif|svg)$/i,
                // use: "file-loader?name=[path][name].[ext]"
                use: [
                    // "file-loader?name=images/[name].[ext]",  //both output and public path matches
                    "file-loader?name=[name].[ext]&outputPath=images/", //&outputPath=images/ if required
                    "image-webpack-loader"   //optimize image files for production
                ]
                // use: "file-loader?name=[hash:6].[ext]&outputPath=images/"   //hash filename
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // port: 9000,   //set a default port
        stats: 'normal', //'errors-only' || 'none'|| 'normal' || 'verbose'
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Project Demo",
            template: './src/index.html', //template file
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            // filename: './../dist/index.html' //output file to dist
        }),
        new ExtractTextPlugin({
            filename: "app.css", //generate file to dist
            disable: isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}