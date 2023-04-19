import api from '@/request/api';
import qs from 'qs';


// 获取所有学生信息数据
export const getAllStudentInfo = () => api.get('/student/studentInfo');

// 获取某个学生信息数据
export const getIdStudents = (data) => api({
    url:'/student/idStudentInfo',
    method:'post',
    data:qs.stringify(data)
});

// 删除某个学生信息 
export const studentInfoDelete = (data) => api({
    url:'/student/studentInfoDelete',
    method:'put',
    headers: { 'content-type': 'application/x-www-form-urlencoded'},
    data:qs.stringify(data)
});

