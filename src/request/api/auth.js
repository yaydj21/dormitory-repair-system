import api from '@/request/api';
import qs from 'qs';

// 注册接口
export const register = (data) => api({
    url:'/api/register',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

// 登录接口
export const login = (data) => api({
    url:'/api/login',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

// 修改用户信息接口
export const updateUserInfo = (data) => api({
    url:'/api/updateUserInfo',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});
