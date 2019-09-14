import request from '@/utils/request';

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
