const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const CopyPlugin = require('copy-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const { NODE_ENV = 'production' } = process.env
module.exports = {
    entry: './src/server.js',
    mode: NODE_ENV,
    watch: NODE_ENV === 'development',
    target: 'node',
    output: {
        path: path.resolve(__dirname, '.build'),
        publicPath: '/public/',
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin({ parallel: true })],
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: 'public', to: 'public' }],
        }),
        new NodemonPlugin(),
    ],
    externals: [nodeExternals()],
}
