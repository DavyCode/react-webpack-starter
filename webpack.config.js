const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');
const autoprefixer = require('autoprefixer');
const precss = require('precss');


var isProd = process.env.NODE_ENV === 'production'; 
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader', // translates CSS into CommonJS modules
      }, {
        loader: 'postcss-loader', // Run post css actions
        options: {
          plugins() {
            // post css plugins, can be exported to postcss.config.js
            return [
              precss,
              autoprefixer
            ];
          }
        }
      }, {
        loader: 'sass-loader' // compiles SASS to CSS
      }
    ],
    publicPath: '/dist'
})
var cssConfig = isProd ? cssProd : cssDev;

var bootstrapConfig = isProd? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;




module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        'tether',
       './src/app.js'
        // bootstrapConfig
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
            // filename: './dist/app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig   // variable constant line 34 above
            },
            {
                test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /bootstrap\/dist\/js\/umd\//, use: 'imports-loader?jQuery=jquery'
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
            },
            { test: /\.(woff2?|svg)$/,
              loader: 'url-loader?limit=10000' 
            },
            { test: /\.(ttf|eot)$/, 
              loader: 'file-loader' 
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        // port: 9000,   //set a default port
        stats: 'normal', //'errors-only' || 'none'|| 'normal' || 'verbose' || 'minimal'
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
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
            Popper: ['popper.js', 'default'],
            'window.Tether': 'tether',
            Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
            Button: 'exports-loader?Button!bootstrap/js/dist/button',
            Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
            Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
            Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
            Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
            Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
            Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: 'exports-loader?Util!bootstrap/js/dist/util'
          }),
    ]
}