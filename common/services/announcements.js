import request from '../utils/request';
import querystring from 'querystring';

export async function create(payload) {
  return request(`/api/announcements`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function remove(id) {
  return request(`/api/announcements/${id}`, {
    method: 'DELETE',
  })
}
