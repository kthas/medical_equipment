import {get,post} from '@/common/js/RequestUtil'

export function getMachineList(params){
    return get('/api/v1/advance/machine/list',params)
}
export function createMain(params){
    return get('/api/v1/advance/machine/createMain',params)
}

export function removeMain(params){
    return get('/api/v1/advance/machine/removeMain',params)
}
export function createSub(params){
    return get('/api/v1/advance/machine/createSub',params)
}
export function removeSub(params){
    return get('/api/v1/advance/machine/removeSub',params)
}
