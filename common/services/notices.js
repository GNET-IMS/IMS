import request from '../utils/request';
import querystring from 'querystring';

export async function search(payload = {}) {
  return request(`/api/notices?${querystring.stringify(payload)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function view(id) {
  return request(`/api/notices/${id}`, {
    method: 'GET',
  })
}

export async function remove(id) {
  return request(`/api/notices/${id}`, {
    method: 'DELETE',
  })
}

export async function read(id) {
  return request(`/api/notices/${id}/read`, {
    method: 'PUT',
  })
}

export async function getPrivateMessages(payload) {
  return request(`/api/notices/private_messages?${querystring.stringify(payload)}`, {
    method: 'GET'
  })
}