var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')


module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^(?!\/__)/], // do zabezpieczen firebase OAuth
    stripPrefix: 'dist',
    root: 'dist/',
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'firestarter',
            filename: 'service-worker.js',
            staticFileGlobs: [
                'dist/index.html',
                'dist/**.js',
                'dist/**.css'
            ],
            stripPrefix: 'dist/assets/',    // striptPrefixMulti is also supported
            mergeStaticsConfig: true
        })
    ]
}