import request from '../utils/request';
import querystring from 'querystring';

export async function search(payload = {}) {
  return request(`/api/users?${querystring.stringify(payload)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function view(id) {
  return request(`/api/users/${id}`, {
    method: 'GET',
  });
}

export async function getCurrentUser() {
  return request(`/api/user`, {
    method: 'GET',
  });
}

export async function create(user) {
  return request(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
}

export async function update(user) {
  return request(`/api/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
}

export async function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  })
}

export async function getAnnouncements(id) {
  return request(`/api/users/${id}/announcements`, {
    method: 'GET',
  })
}

export async function pullAnnouncements(id) {
  return request(`/api/user/${id}/announcements`, {
    method: 'POST'
  })
}