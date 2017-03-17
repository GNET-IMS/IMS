import request from '../utils/request';
import querystring from 'querystring';

export async function search(access_token, payload) {
  return request(`/api/users?query=${JSON.stringify(payload)}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })
}

export async function view(access_token, id) {
  return request(`/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

export async function create(access_token, user) {
  return request(`/api/users`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
}

export async function remove(access_token, id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
}
