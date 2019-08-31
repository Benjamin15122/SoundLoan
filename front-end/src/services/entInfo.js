import request from '@/utils/request';

export const getNews = async (company_name) => {
  const res = await request.get('/news/getNews', { params: { company_name } });
  return res['return_object'];
};
