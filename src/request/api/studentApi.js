import api from '@/request/api';

export const getStudentInfo = () => api.get('/student/studentInfo');