import api from '@/request/api';
import qs from 'qs';

// 获取全部维修信息
export const getRepairOrderInfo = () => api.get('/repairOrder/repairOrderInfo');

// 获取我的维修信息
export const getMyRepairOrders = (data) => api({
    url:'/repairOrder/myRepairOrders',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

// 获取某个维修信息
export const getRepairIdOrderInfo = (data) => api({
    url:'/repairOrder/repairIdOrderInfo',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

// 修改某个维修订单信息
export const updateRepairIdOrderInfo = (data) => api({
    url:'/repairOrder/updateRepairIdOrderInfo',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

// 删除某个维修订单信息
export const orderDataDelete = (data) => api({
    url:'/repairOrder/orderDataDelete',
    method:'put',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

// 增加某个订单信息
export const addOrder = (data) => api({
    url:'/repairOrder/addOrder',
    method:'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});


// 获取今日报修数量
export const getHomeRepairTag = () => api.get('/repairOrder/homeRepairTag');

// 获取近7日报修的类型
export const getRepairOrders7Days = () => api.get('/repairOrder/repairOrders7Days');

// 获取上个月和本月报修类型
export const getMonthRepairTypesRepairCount = () => api.get('/repairOrder/monthRepairTypesRepairCount');

// 获取系统全部报修的类型接口getAllRepairTypesRepairCount
export const getAllRepairTypesRepairCount = () => api.get('/repairOrder/allRepairTypesRepairCount');


