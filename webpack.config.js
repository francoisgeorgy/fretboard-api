const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


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
    entry: {
        index: path.resolve('./src/index.js'),  // to have dist/index.js instead of default dist/main.js
    },
    output: {
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
                        // drop_console: true,
                        drop_console: false,
                    }
                }
            })
        ]
    }
};
