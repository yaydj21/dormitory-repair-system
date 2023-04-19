import api from '@/request/api';
import qs from 'qs';

// 获取通知信息
export const getNoticeInfo = () => api.get('/notice/noticeInfo');

// 修改通知信息 
export const updateNotices = (data) => api({
    url:'/notice/updateNotices',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

// 删除通知信息 
export const deleteNotices = (data) => api({
    url:'/notice/noticeDataDelete',
    method:'put',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

// 增加通知信息 
export const addNotice = (data) => api({
    url:'/notice/addNotice',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

