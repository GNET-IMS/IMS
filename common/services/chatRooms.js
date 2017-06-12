import request from '../utils/request';
import querystring from 'querystring';

export async function search(payload = {}) {
  return request(`/api/chat_rooms?${querystring.stringify(payload)}`)
}

export async function view(id) {
  return request(`/api/chat_rooms/${id}`)
}

export async function remove(id) {
  return request(`/api/chat_rooms/${id}`, {
    method: 'DELETE',
  })
}

export async function create(payload) {
  return request(`/api/chat_rooms`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}