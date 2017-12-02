const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');


module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
            // filename: './dist/app.bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: '/dist'
            }),
        },
        {
         test: /\.js$/,
          exclude: /node_modules/, 
          use: "babel-loader" 
        }
    ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // port: 9000,   //set a default port
        stats: 'minimal', //'errors-only' || 'none'|| 'normal' || 'verbose'
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Project Demo",           
            template: './src/index.html',   //template file
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            filename : './../dist/index.html'  //output file to dist
        }),
        new ExtractTextPlugin({
            filename: "app.css",            //generate file to dist
            // disabled: false,
            // allChunks: true
        }),
    ]
}