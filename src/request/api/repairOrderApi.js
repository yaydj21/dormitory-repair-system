import api from '@/request/api';

// 获取通知信息
export const getRepairOrderInfo = () => api.get('/repairOrder/repairOrderInfo');
