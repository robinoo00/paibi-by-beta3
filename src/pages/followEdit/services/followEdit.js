import request from '../../../utils/request'
import config from '../../../utils/config'

export function addFollow(values){
    return request(config.server + 'AddRelation',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
export function editFollow(values){
    return request(config.server + 'Relationedit',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
export function removeFollow(values){
    return request(config.server + 'Relationdel',{
        method:'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body:values
    })
}
