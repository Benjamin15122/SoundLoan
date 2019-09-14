import request from '@/utils/request';

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function makePayment(params) {
  const formData = new FormData()
  for(var i in params){
    formData.append(i, params[i])
  }
  return request('/apis/alipay/makePayment', {
    method: 'POST',
    body: formData,
  });
}

export async function uploanAndAnalyze(params) {
  const formData = new FormData()
  for(var i in params){
    formData.append(i, params[i])
  }
  return request('/apis/contract/uploanAndAnalyze', {
    method: 'POST',
    body: formData,
  })
}
