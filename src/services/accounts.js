import request from '../utils/request';
import querystring from 'querystring';

export async function view(access_token, id) {
  return request(`/api/accounts/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    },
  })
}

export async function create(access_token, account) {
  return request(`/api/accounts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(account)
  })
}

export async function remove(access_token, id) {
  return request(`/api/accounts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  })
}
