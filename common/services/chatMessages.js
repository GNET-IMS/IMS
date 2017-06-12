import request from '../utils/request';
import querystring from 'querystring';

export async function search(payload = {}) {
  return request(`/api/chat_messages?${querystring.stringify(payload)}`)
}

export async function view(id) {
  return request(`/api/chat_messages/${id}`)
}

export async function remove(id) {
  return request(`/api/chat_messages/${id}`, {
    method: 'DELETE',
  })
}

export async function create(payload) {
  return request(`/api/chat_messages`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}