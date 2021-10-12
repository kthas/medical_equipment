import {get,post} from '@/common/js/RequestUtil'

export function getMachineList(params){
    return get('/api/v1/advance/machine/list',params)
}