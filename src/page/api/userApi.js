import {get,post} from '@/common/js/RequestUtil'


export function getUserInfo(params){
    return get('/api/v1/basic/user/info',params)
}

export function getUserList(params){
    return get('/api/v1/advance/user/list',params)
}
export function updateUserInfo(params){
    return get('/api/v1/advance/user/updateInfo',params)
}
export function updateUnit(params){
    return get('/api/v1/basic/user/updateUnit',params)
}

export function addNewUser(params){
    return post('/api/v1/advance/user/addNewUser',params)
}
export function getUserGroupList(params){
    return get('/api/v1/advance/usergroup/list',params)
}

export function addToGroup(params){
    return get('/api/v1/advance/user/addToGroup',params)
}
export function removeFromGroup(params){
    return get('/api/v1/advance/user/removeFromGroup',params)
}
export function getGroupList(params){
    return get('/api/v1/advance/usergroup/list',params)
}

export function createGroup(params){
    return get('/api/v1/advance/usergroup/create',params)
}
export function updateGroup(params){
    return get('/api/v1/advance/usergroup/updateGroup',params)
}
export function removeGroup(params){
    return get('/api/v1/advance/usergroup/remove',params)
}

export function addPermission(params){
    return get('/api/v1/advance/usergroup/addPermission',params)
}
export function removePermission(params){
    return get('/api/v1/advance/usergroup/removePermission',params)
}
export function updateChecker(params){
    return get('/api/v1/advance/unit/updateChecker',params)
}


