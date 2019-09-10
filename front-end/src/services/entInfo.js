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
