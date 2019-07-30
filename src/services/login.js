import request from 'yjtec-request';

export async function fetchLogin(params) {
  return request('/api/user', {
    method: 'POST',
    data: params,
    requestType: 'form'
  });
}

export async function getCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}