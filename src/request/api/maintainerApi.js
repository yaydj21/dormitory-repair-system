import api from '@/request/api';
import qs from 'qs';

export const getMaintainerInfo = () => api.get('/maintainer/maintainerInfo');


// 删除某个维修员信息 
export const maintainerInfoDelete = (data) => api({
    url:'/maintainer/maintainerInfoDelete',
    method:'put',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

