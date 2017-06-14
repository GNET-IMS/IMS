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

export async function getAnnouncements(id, payload) {
  return request(`/api/users/${id}/announcements?${querystring.stringify(payload)}`, {
    method: 'GET',
  })
}

export async function pullAnnouncements(id) {
  return request(`/api/users/${id}/announcements`, {
    method: 'POST'
  })
}

export async function removeAnnouncement(payload) {
  return request(`/api/users/${payload.userId}/announcements/${payload.announcementId}`, {
    method: 'DELETE'
  })
}