var appName = 'cftvc';

module.exports = {
    appName: appName,
    db: 'mongodb://localhost/' + appName,
    server: {
        // mode: 'development', //can be 'development', 'production', or 'localProductionTest'
        port: 5000,
        basePath: '/' + appName
    },
    sessionSecret: 'developmentSessionSecret'
}