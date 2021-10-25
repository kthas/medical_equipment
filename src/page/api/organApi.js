import {get,post} from '@/common/js/RequestUtil'

export function getOrganList(params){
    return get('/api/v1/advance/unit/listInTree',params)
}

export function updateInfo(params){
    return get('/api/v1/advance/unit/updateInfo',params)
}
export function remove(params){
    return get('/api/v1/advance/unit/remove',params)
}

export function create(params){
    return get('/api/v1/advance/unit/create',params)
}

export function listChecker(params){
    return get('/api/v1/advance/unit/listChecker',params)
}
export function listUser(params){
    return get('/api/v1/advance/unit/listUser',params)
}



