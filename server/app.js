import path from 'path'
import webpack from 'webpack'
import express from 'express'
import httpProxy from 'http-proxy';
import https from 'https';
import fs from 'fs';
import appConfig from '../config/appConfig';
import ejs from 'ejs';
import routes from './routes';
import { exchangeAccessToken } from './controllers/code';
import cookie from 'cookie';

const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('.html', ejs.renderFile);

const options = {
  // This is for the proxy
  ssl: {
    key: fs.readFileSync(path.join(__dirname, 'certs/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs/certificate.pem')),
  },
  // This is duplicated for the regular https server
  key: fs.readFileSync(path.join(__dirname, 'certs/privatekey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/certificate.pem')),
};

app.get('/code', exchangeAccessToken);

//权限判断
app.use('*', (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie);
  const { access_token } = cookies;
  if (access_token) {
    next()
  } else {
    res.redirect('/authorize');
  }
})

//webpack中间件配置，包括hotReplace
if (!appConfig.isProduction) {
  const wpConfig = require('../build/webpack.dev.js');
  const compiler = webpack(wpConfig)

  const webpackMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackMiddleware(compiler, {
    publicPath: wpConfig.output.publicPath,
    noInfo: true,
    stats: { colors: true }
  }))
  app.use(webpackHotMiddleware(compiler))
}

//静态文件服务
app.use(express.static(path.join(__dirname, '../public')))


//set routes
app.use('/', routes);

/**
 * The HTTPS Authorization Server
 */
const authServer = httpProxy.createProxyServer({
  target: 'https://localhost:3000',
  secure: false,
});

/**
 * The HTTPS Resource Server
 */
const resourceServer = httpProxy.createProxyServer({
  target: 'http://localhost:3333',
  secure: false,
});

/**
 * The local HTTP Resource Server
 */
const localServer = httpProxy.createProxyServer({
  target: 'https://localhost:8888',
  secure: false,
});

/**
 * Proxy that listens on 5000, which proxies all the
 * Authorization requests to port 3000 and all
 * Resource Servers to 4000
 * authorize
 * authorize拼接
 * http://xxxx/authorize?response_type=code&redirect_uri=http://local
 * 
 * http://local?code=xxxx
 * 
 * code - > authorizeserver access_token
 * 
 * access_token storage
 * 
 */
https.createServer(options, (req, res) => {
  if (req.url.startsWith('/oauth/token') || req.url.startsWith('/login') || req.url.startsWith('/authorize') || req.url.startsWith('/dialog') || req.url.startsWith('/javascripts') || req.url.startsWith('/stylesheets')) {
    if (req.url === '/authorize') {
      req.url = `/dialog/authorize?redirect_uri=https://localhost:5000/code&response_type=code&client_id=admin&scope=offline_access`
    };
    authServer.web(req, res);
  } else if (req.url.startsWith('/api')) {
    const cookies = cookie.parse(req.headers.cookie);
    const { access_token } = cookies;
    req.headers.authorization = `Bearer ${access_token}`;
    resourceServer.web(req, res);
  } else {
    localServer.web(req, res);
  }
}).listen(5000);



var server = https.createServer(options, app);

if (appConfig.port) {
  server.listen(appConfig.port, appConfig.host, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.info('server is running at %d', appConfig.port)
    }
  })
} else {
  console.error('No port is set')
}