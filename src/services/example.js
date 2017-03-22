import request from '../utils/request';
import querystring from 'querystring';

export async function query() {
  return request('/api/users');
}
