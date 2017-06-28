const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
    entry : {vendor:['react','react-dom'],app:'./src/index.js'},
    output: {
        path: path.resolve(__dirname, 'build'),
        filename : 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test:/\.postcss$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                modules: true,
                                minimize: false
                            }
                        },
                        'postcss-loader'
                        ]
                }),
                exclude: /node_modules/
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use :'babel-loader'
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename:'common.js'})
    ]
}