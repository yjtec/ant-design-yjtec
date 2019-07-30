import request from 'yjtec-request';
export async function queryCurrent() {
    return request('/api/currentUser');
}