import api from '@/request/api';

// 获取通知信息
export const getNoticeInfo = () => api.get('/notice/noticeInfo');

// 删除通知信息 
export const deleteNotices = (data) => api({
    url:'/notice/noticeDataDelete',
    method:'put',
    data
});