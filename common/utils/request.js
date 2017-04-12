import fetch from 'dva/fetch';
import { routerRedux } from 'dva/router';
import { ROOT_PATH } from '../constants';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  let error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function getFullUrl(url) {
  const isComplete = url.indexOf('http') === 0;
  return isComplete ? url : url.indexOf('/') === 0 ? ROOT_PATH + url : ROOT_PATH + '/' + url;
}

export function parseError(error) {
  try {
    if (error.response.status === 401) {
      setTimeout(() => {
        location.replace('/authorize');
      }, 2000);
      return error.response.text()
        .then(message => {
          return {
            message: `${message}, 登录授权过期，2秒后自动跳转至登录页`,
            timestamp: new Date().getTime(),
            status: 401
          }
        })
    } else if (error.response.status === 422) {
      return error.response.text()
        .then(message => {
          return {
            message: `数据格式错误！, {message}`,
            timestamp: new Date().getTime(),
            status: 422
          }
        })
    } else {
      return error.response.json()
    }
  } catch (err) {
    return Promise.resolve({
      timestamp: new Date().getTime(),
      message: 'unkown error',
      status: error.response && error.response.status,
    });
  }

}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, Object.assign(options, { credentials: 'include' }))
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}