import request from '../utils/request';
import querystring from 'querystring';

export async function upload(payload) {

  let formData = new FormData();
  formData.append('photo', payload.file);

  return request(`/api/users/${payload.id}/upload`, {
    method: 'POST',
    body: formData
  })
}
