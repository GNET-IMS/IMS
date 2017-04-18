import request from '../utils/request';
import querystring from 'querystring';

export async function search(access_token, payload = {}) {
  return request(`/api/messages?${querystring.stringify(payload)}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })
}

export async function view(access_token, id) {
  return request(`/api/messages/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

export async function remove(access_token, id) {
  return request(`/api/messages/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
}

export async function read(access_token, id) {
  return request(`/api/messages/${id}/read`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
}
