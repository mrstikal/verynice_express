const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const PugPlugin = require('pug-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const env = process.env.NODE_ENV;

module.exports = {
    mode: 'development',
    env: 'development',
    entry: path.join(__dirname, "src", "index.ts"),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist/")
    },
    target: 'node',
    externals: [nodeExternals()],
    experiments: {
        topLevelAwait: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-typescript"
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                // write image files under 10k to inline or copy image files over 10k
                test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                // write files under 10k to inline or copy files over 10k
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: '/\.pug$/',
                loader: PugPlugin.loader,
                options: {
                    method: 'render',
                }
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new NodemonPlugin(),
        new HtmlWebpackPlugin(),
        new Dotenv()
    ]
}