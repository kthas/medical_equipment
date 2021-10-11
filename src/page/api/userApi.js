import {get,post} from '@/common/js/RequestUtil'


export function getUserInfo(params){
    return get('/api/v1/basic/user/info',params)
}

export function getUserList(params){
    return get('/api/v1/advance/user/list',params)
}