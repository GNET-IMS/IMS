import express from 'express';
import webpack from 'webpack';
import https from 'https';
import fs from 'fs';
import path from 'path';
import cookie from 'cookie';
import httpProxy from 'http-proxy';
import config from '../webpack.config.babel';
import { exchangeAccessToken } from './controllers/code';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  // webpack compile
  const compiler = webpack(config);
  const options = {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: { colors: true },
  };
  app.use(require('webpack-dev-middleware')(compiler, options));
  app.use(require('webpack-hot-middleware')(compiler));

  // mock
  app.use(require('./mockMiddleware'));
}

app.get('/code', exchangeAccessToken);

app.get('*', (req, res, next) => {
  if (req.url !== '/authorize' && 'undefined' === typeof req.headers.cookie) {
    res.redirect('/authorize');
    return false;
  }
  const access_token = req.headers.cookie && cookie.parse(req.headers.cookie).access_token;
  if (req.url == '/authorize' || access_token) {
    next()
  } else {
    res.redirect('/authorize');
  }
})

const options = {
  // This is for the proxy
  ssl: {
    key: fs.readFileSync(path.join(__dirname, './certs/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname, './certs/certificate.pem')),
  },
  // This is duplicated for the regular https server
  key: fs.readFileSync(path.join(__dirname, 'certs/privatekey.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs/certificate.pem')),
};


/**
 * The HTTPS Authorization Server
 */
const authServer = httpProxy.createProxyServer({
  target: 'http://localhost:3000',
  secure: false,
});

authServer.on('error', function(e) {
  console.log(e.message)
});

/**
 * The HTTPS Resource Server
 */
const resourceServer = httpProxy.createProxyServer({
  target: 'http://localhost:7001',
  secure: false,
});

resourceServer.on('error', function(e) {
  console.log(e.message)
});

/**
 * The local HTTP Resource Server
 */
const localServer = httpProxy.createProxyServer({
  target: 'http://localhost:8080',
  secure: false,
});

localServer.on('error', function(e) {
  console.log(e.message)
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
  if (req.url.startsWith('/login') || req.url.startsWith('/public/css/login.css')) {
    if (req.url === '/login/oauth/authorize') {
      req.url = `/login/oauth/authorize?redirect_uri=http://localhost:8080/code&response_type=code&client_id=admin&scope=offline_access`
    };
    authServer.web(req, res);
  } else if (req.url.startsWith('/api') || req.url.startsWith('/public') || req.url.startsWith('/socket.io')) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const { access_token } = cookies;
    req.headers.authorization = `Bearer ${access_token}`;
    resourceServer.web(req, res);
  } else {
    localServer.web(req, res);
  }
}).listen(5000);



app.use(require('./ssrMiddleware'));
app.disable('x-powered-by');

const server = app.listen(8080, () => {
  const { port } = server.address();
  console.info(`Listened at http://localhost:${port}`);
});
