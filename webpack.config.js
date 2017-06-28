const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
    entry : './src/index.js',
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
                                modules: true
                            }
                        },
                        'postcss-loader'
                        ]
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}