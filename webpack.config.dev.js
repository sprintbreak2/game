const webpackBase = require('./webpack.config')

module.exports = ({ ENV_FILE }, argv) => ({
    ...webpackBase({ ENV_FILE }, argv),
    devServer: {
        historyApiFallback: true,
        port: 3000
    },
    devtool: 'inline-source-map'
})
