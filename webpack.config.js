const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        main: "./src/index.js"
        // bookshelf: "./src/bookshelf.js"
        // vendors: ['react']
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 8080,
        publicPath: "http://localhost:8080/dist/",
        hotOnly: true,
        proxy: [{
            context: ['/auth/goodreads', '/goodreads', '/getmybooks'],
            target: 'http://localhost:3000',
        }],
        historyApiFallback: true //for react router
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    node: {
        fs: "empty"
    }
};