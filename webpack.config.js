// const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
/*
const serverConfig = {
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.node.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};

const clientConfig = {
    target: 'web', // <=== can be omitted as default is 'web'
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true,
                    }
                }
            })
        ]
    }
};

module.exports = [ serverConfig, clientConfig ];
*/

module.exports = {
    // entry: {
    //     index: path.resolve('./src/index.js'),
    // },
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',   // to have dist/index.js instead of default dist/main.js
        library: "fretboardApi",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true
                        // drop_console: false
                    }
                }
            })
        ]
    },
    plugins: [
        // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildEnd:['echo "Webpack End"']})
        new WebpackShellPlugin({
            onBuildEnd: 'node copy-to-docs.js'
        })
       /* new CopyWebpackPlugin([
            {  from: 'dist/index.js',
                to: path.resolve(__dirname, 'docs') + '/index.js',
                toType: 'file'
            }
        ])*/
    ]
};
