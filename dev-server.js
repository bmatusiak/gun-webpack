const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./app-client/webpack.config.js')();

const compiler = Webpack(webpackConfig);
const devServerOptions = {
    ...webpackConfig.devServer,
    open: false
};
const server = new WebpackDevServer(devServerOptions, compiler);


const runServer = async () => {
    console.log('Starting server...');
    await server.start();
    server.app.server = server.server;
    process.env.DEBUG = true;
    require('./app-server')(require("express"), server.app);
};


runServer();