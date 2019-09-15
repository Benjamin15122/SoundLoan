import request from '@/utils/request';
import { number } from 'prop-types';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}

export const indLogin = async (nickname, password) => {
  return await request.post('/infoMan/indLogin', {
    data: {
      nickname,
      password
    }
  });
};

export const entLogin = async (nickname, password) => {
  return await request.post('/infoMan/entLogin', { data: { nickname, password }});
};

export const changePW = async (postData) => {
  const res = await request.post('/infoMan/changePW', { data: postData });
  return res['success'];
};

export const calculate = async (amount, rate, duration, type) => {
  const formData = new FormData();
  formData.append('amount', amount);
  formData.append('rate', rate);
  formData.append('duration', duration);
  formData.append('type', type);
  const res = await request.post('/apis/loan/calculate', { data: formData });
  return res['content'];
};
