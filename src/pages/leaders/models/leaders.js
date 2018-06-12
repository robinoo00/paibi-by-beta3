import * as LeadersServices from '../services/leaders'
let loading = false;

export default {
    namespace:'leaders',
    state:{
        list_earn:{
            list:[],
            nomore:false,
            page:0
        },
        list_win:{
            list:[],
            nomore:false,
            page:0
        },
        list_hot:{
            list:[],
            nomore:false,
            page:0
        }
    },
    subscriptions:{},
    reducers:{
        // assignList(state,{data,page,type}){
        //     let nomore = false;
        //     if(data.length === 0 || data.length < 10){
        //         nomore = true;
        //     }
        //     if(page === 1){
        //         let new_data = {
        //             list:[...data],
        //             page:page,
        //             nomore:nomore
        //         }
        //         switch(type){
        //             case 'earn':
        //                 return {
        //                     ...state,
        //                     list_earn:new_data
        //                 }
        //                 break;
        //             case 'win':
        //                 return {
        //                     ...state,
        //                     list_win:new_data
        //                 }
        //                 break;
        //             case 'hot':
        //                 return {
        //                     ...state,
        //                     list_hot:new_data
        //                 }
        //                 break;
        //         }
        //     }else{
        //         switch(type){
        //             case 'earn':
        //                 return {
        //                     ...state,
        //                     list_earn:{
        //                         list:[...state.list_earn.list,...data],
        //                         page:page,
        //                         nomore:nomore
        //                     }
        //                 }
        //                 break;
        //             case 'win':
        //                 return {
        //                     ...state,
        //                     list_win:{
        //                         list:[...state.list_win.list,...data],
        //                         page:page,
        //                         nomore:nomore
        //                     }
        //                 }
        //                 break;
        //             case 'hot':
        //                 return {
        //                     ...state,
        //                     list_hot:{
        //                         list:[...state.list_hot.list,...data],
        //                         page:page,
        //                         nomore:nomore
        //                     }
        //                 }
        //                 break;
        //         }
        //     }
        // }
    },
    effects:{
        // *getList({type = 'earn',page =1},{call,put,select}){
        //     const {data} = yield call(LeadersServices.getList,{type:'资讯',page:page,pageSize:10})
        //     loading = false;
        //     if(data){
        //         yield put({
        //             type:'assignList',
        //             data:data.Rows,
        //             page:page,
        //             type:type
        //         })
        //     }
        // },
        // *loadMore({type},{put,select}){
        //     if(!loading){
        //         let page,nomore;
        //         switch(type){
        //             case 'earn':
        //                 page = yield select(state => state.leaders.list_earn.page);
        //                 nomore = yield select(state => state.leaders.list_earn.nomore);
        //                 break
        //             case 'win':
        //                 page = yield select(state => state.leaders.list_win.page);
        //                 nomore = yield select(state => state.leaders.list_win.nomore);
        //                 break
        //             case 'hot':
        //                 page = yield select(state => state.leaders.list_hot.page);
        //                 nomore = yield select(state => state.leaders.list_hot.nomore);
        //                 break
        //         }
        //         if(!nomore){
        //             yield put({
        //                 type:'getList',
        //                 page:page + 1,
        //                 type:type
        //             })
        //         }
        //         loading = true;
        //     }
        // }
    }
}
