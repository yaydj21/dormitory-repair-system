import api from '@/request/api';

export const getMaintainerInfo = () => api.get('/maintainer/maintainerInfo');