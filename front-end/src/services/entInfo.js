import request from '@/utils/request';

export const getRecommendedEnterprises = async (nickname) => {
  const res = await request.get('/enterprise/recommendation',
    { params: { user_name: nickname, num_max: 5}});
  return res['content'];
};

export const getNews = async (company_name) => {
  const res = await request.get('/news/getNews', { params: { company_name } });
  return res['return_object'];
};

export const searchEnterprises = async (name) => {
  const res = await request.get('/infoMan/searchEnt', { data: { company_name: name } });
  return res['content'];
};

export const getComments = async (company_name) => {
  const res = await request.get('/infoMan/entProductComment', { data: {company_name }});
  return res['content'];
};

export const getEntUserInfo = async (name) => {
  const res = await request.get('/infoMan/entUserInfo', { params: { name }});
  return res['content'];
};

export const getChanges = async (ent_name) => {
  const res = await request.get('/authen/getEnterpriseChange', { params: { ent_name }});
  return res['content'];
};

export const getRelations = async (ent_name) => {
  const res = await request.get('/authen/getEnterpriseRelation', { params: { ent_name }});
  return res['content'];
};
