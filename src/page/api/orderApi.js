import {get,post} from '@/common/js/RequestUtil'

export function listAllUserOrders(params){
    return get('/api/v1/advance/order/listAllUserOrders',params)
}

export function listAllUnitOrders(params){
    return get('/api/v1/advance/order/listAllUnitOrders',params)
}
export function verify(params){
    return get('/api/v1/advance/order/verify',params)
}
export function cancelByChecker(params){
    return get('/api/v1/advance/order/cancelByChecker',params)
}


