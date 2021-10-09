import {get,post} from '@/common/js/RequestUtil'

export function login(data){
    return post('/api/basic/login',data)
}

export function test(){
    return get('/api/basic/info/egg')
}