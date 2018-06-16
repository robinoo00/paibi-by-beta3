import * as PersonalServices from '../services/personal'

export default {
    namespace:'personal',
    state:{
        info:{
            持卡人:'',
            可用资金:0,
            empty:true
        }
    },
    subscriptions:{},
    reducers:{
        assignInfo(state,{data}){
            return{
                ...state,
                info:data,
                empty:false
            }
        }
    },
    effects:{
        *getInfo({},{put,call}){
            const {data} = yield call(PersonalServices.getUserInfo,{});
            if(data){
                yield put({
                    type:'assignInfo',
                    data:data
                })
            }
        }
    }
}
