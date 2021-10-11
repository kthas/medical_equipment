import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
//2.新创建一个vue实例
let v = new Vue();
let baseUrl="localhost:8081"
//2、创建axios的实例
let httpService = axios.create({
    baseUrl: "localhost:8081",// TODO:具体的配置可以根据项目情况而来
    timeout:5000
})
//3、axios的拦截--request
httpService.interceptors.request.use(config => {
    // 请求成功处理
    if(localStorage.getItem('token')){//判断浏览器中的cookie中是否存在项目的token
        config.headers.token = localStorage.getItem('token')
    } else {
       router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
    }
    return config;
},err => {
    Promise.reject(err);// 请求错误处理
})
//4、axios的拦截--response
httpService.interceptors.response.use(response => {
    if(response.data.code === 400){
        v.$message.warning(response.data.msg)
        router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
    }
    
    return response;
},err => {
	// TODO:具体的code对应的处理可继续添加修改]
    if(err){
        v.$message.error('请联系管理员');
    }
    return Promise.reject(err);
})


//5、get请求的封装
export function get(url,params){
    return new Promise((resolve,reject) => {
        params.token =  localStorage.getItem('token')
        httpService({
            url:url,
            method:'get',
            params:params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    })
}
//6、post请求封装  默认json格式:'Content-Type':'application/json',如果是文件上传，可以修改headers为 headers: { 'Content-Type': 'multipart/form-data' }
export function post(url,params,headers={'content-type':'application/json'}){
    return new Promise((resolve,reject) => {
        params.token =  localStorage.getItem('token')
        httpService({
            url:url,
            method:'post',
            params: params,
            headers: headers
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    })
}
//7、将模块暴露
export default{
    get,
    post
}