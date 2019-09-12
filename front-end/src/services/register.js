import request from '@/utils/request';

export const comVerify = async basicInfo => {
  const res = await request.get('/authen/comVerify', { params: basicInfo });
  return res['success'];
};

export const askForIdCard = async (pic_front, pic_back) => {
  const res = await request.get('/authen/askForIdCard', { params: { pic_front, pic_back } });
  return res['content'];
};

export const legalPersonAuthenByPhone = async (name, id_card, number) => {
  const res = await request.get('/authen/legalPersionAuthenticateByPhone', {
    params: { name, id_card, number },
  });
  return res['success'];
};

export const finishLegalPersonAuthen = async (number, code) => {
  const res = await request.get('/authen/finishLegalPersonAuthenticateByPhoneNumber', {
    params: { number, code },
  });
  return res['success'];
};

export const createEntUser = async postData => {
  const res = await request.post('/infoMan/createEntUser', { data: postData });
  return res['success'];
};

export const newCreateIndUser = async postData => {
  const res = await request.post('/infoMan/newCreateIndUser', { data: postData });
  return res['success'];
};
