import request from '@/utils/request';


export const getEntProductComments = async (company_name) => {
  const res = await request.get('/infoMan/entProductComment', { data: { company_name }});
  return res['content'];
};

export const addCommentComplain = async (postData) => {
  const res = await request.post('/infoMan/addCommentComplain', { data: postData});
  return res['success'];
};
