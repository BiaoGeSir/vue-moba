import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL: 'http://192.168.100.127:3000/admin/api/'
})

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){
        config.headers.Authorization = 'Bearer ' + (localStorage.token || '');
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

http.interceptors.response.use(res => {
    return res;
}, err => {
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
    }
    //拦截报错，状态码为 401 统一跳转到登录页
    if(err.response.status === 401){
        router.push('/login')
    }
    return Promise.reject(err);
})

export default http