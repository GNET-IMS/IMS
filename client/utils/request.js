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
    return error.response.json();
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
  return fetch(url, {
    credentials: 'include',
    ...options,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function upload(url, formData, onprogress) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert(xhr.responseText);
    }
  }

  // const onprogress =  evt => {

  //   var loaded = evt.loaded;
  //   var tot = evt.total;
  //   var per = Math.floor(100 * loaded / tot);  //已经上传的百分比  
  //   var son = document.getElementById('son');
  //   son.innerHTML = per + "%";
  //   son.style.width = per + "%";
  // }

  xhr.upload.onprogress = onprogress;
  xhr.open("post", getFullUrl(url));  
  xhr.send(formData); 
}
