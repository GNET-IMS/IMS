import request from 'request';
import cookie from 'cookie';
import { client } from '../../config/appConfig';

export function exchangeAccessToken(req, res) {
    const code = req.query.code;
    const basicAuth = new Buffer(`${client.id}:${client.secret}`).toString('base64');
    request.post({
        url: 'https://localhost:3000/oauth/token',
        agentOptions: {
            rejectUnauthorized: false
        },
        form: {
            code,
            scope: 'offline_access',
            redirect_uri: 'https://localhost:5000/code',
            client_id: client.id,
            client_secret: client.secret,
            grant_type: 'authorization_code'
        },
        headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-type': 'application/x-www-form-urlencoded'
        },
    }, (error, response, body) => {
        const { access_token, refresh_token, expires_in } = JSON.parse(body);
        if (response.statusCode === 200 && access_token) {
            res.setHeader('set-cookie', cookie.serialize('access_token', access_token))
            res.redirect('/');
        }
    });
}