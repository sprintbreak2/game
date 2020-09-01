const webpackBase = require('./webpack.config')

module.exports = ({ ENV_FILE }, argv) => ({
    ...webpackBase({ ENV_FILE }, argv),
    devServer: {
        historyApiFallback: true
    },
    devtool: 'inline-source-map'
})
