const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8888,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3333,
  client: {
    id: 'admin',
    secret: '1234',
  }
}, environment);