import request from '@/utils/request';


export const getEntProductComments = async (company_name) => {
  const res = await request.get('/infoMan/entProductComment', { data: { company_name }});
  return res['content'];
};

export const addCommentComplain = async (postData) => {
  const res = await request.post('/infoMan/addCommentComplain', { data: postData});
  return res['success'];
};

export const getEntLoanApply = async (company_name) => {
  const res = await request.get('/infoMan/entLoanApply', { data: { company_name}});
  return res['content'];
};

export const getAllContract = async (user_name, user_type) => {
  const res = await request.post('/contract/getAll', {data: { user_name, user_type}});
  return res['content'];
};

export const getEntUserInfo = async (company_name) => {
  const res = await request.get('/infoMan/entUserInfo', { data: { company_name }});
  return res['content'];
};

export const changeEntUser = async (postData) =>{
  const res = await request.post('/infoMan/changeEntUser',{data:postData});
  return res['success'];
};
