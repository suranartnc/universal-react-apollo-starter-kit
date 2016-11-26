module.exports = {
  development: {
    isProduction: false,
    host: 'localhost',
    port: 3000,
    wdsPort: 3001,
    apiHost: 'localhost',
    apiPort: 3002,
    wsPort: 8080,
    mongoConnectionString: 'mongodb://localhost:27017/urrsk',
  },
  production: {
    isProduction: true,
    host: 'localhost',
    port: process.env.PORT || 3000,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || 3002,
    wsPort: 8080,
    mongoConnectionString: 'mongodb://localhost:27017/urrsk',
  },
}[process.env.NODE_ENV || 'development']
