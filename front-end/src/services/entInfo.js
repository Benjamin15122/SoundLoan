import request from '@/utils/request';

export const getRecommendedEnterprises = async () => {
  const res = await request.get('/enterprise/recommendation');
  return res['content'];
};

export const getNews = async (company_name) => {
  const res = await request.get('/news/getNews', { params: { company_name } });
  return res['return_object'];
};
