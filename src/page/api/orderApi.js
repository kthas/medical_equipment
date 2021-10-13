import {get,post} from '@/common/js/RequestUtil'

export function listAllUserOrders(params){
    return get('/api/v1/advance/order/listAllUserOrders',params)
}
