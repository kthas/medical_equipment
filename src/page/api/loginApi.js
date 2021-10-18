import {get,post} from '@/common/js/RequestUtil'

export function login(params){
    return post('/api/basic/login',params)
}

export function test(){
    return get('/api/basic/info/egg')
}
export function listPermission(params){
    return get('/api/basic/info/listPermission',params)
}
