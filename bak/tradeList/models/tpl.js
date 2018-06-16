import * as TradeListServices from '../services/tpl'
import {Toast, Modal} from 'antd-mobile'
import config from "../../../utils/config";
import * as TradeServices from "../../trade/services/trade";

const alert = Modal.alert
let loading = false;
export default {
    namespace: 'tradeList',
    state: {
        nav_index: 'hold',
        position_list: {
            list:[],
            page:0,
            nomore:false,
            empty:false
        },
        deal_list: [],
        undeal_list: [],
        earn: 0,
        history_list: {
            list:[],
            page:0,
            nomore:false,
            empty:false
        },
        ping_list: {
            list:[],
            page:0,
            nomore:false
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                // if (pathname === '/tradeList' && localStorage.getItem(config.KEY)) {
                //     dispatch({
                //         type: 'getPositionList'
                //     })
                // }
            })
        },
    },

    effects: {
        * order({direction, code, num}, {call,put}) {
            const post_data = {
                symbol: code,
                Buysell: direction,
                Qty: num,
                Price:0,
                Ordertype: "市价"
            }
            const {data} = yield call(TradeListServices.order, post_data);
            window.hideAll();
            if(data){
                if (data.信息 === 'api error') {
                    Toast.info('交易失败');
                } else {
                    Toast.info(data.信息)
                }
            }
        },
        * ping({direction,code}, {put, call, select}) {
            const {data} = yield call(TradeListServices.getOffect, {symbol: code});
            if (data) {
                if (data.手数 === 0) {
                    window.toast('还未持仓');
                    Toast.hide();
                } else {
                    yield put({
                        type: 'order',
                        direction: direction === 0 ? "卖出" : "买入",
                        num:data.手数,
                        code:code
                    })
                }
            } else {
                Toast.info('交易失败');
                Toast.hide();
            }

        },
        * getPositionList({}, {call, put}) {
            const {data} = yield call(TradeListServices.getPositionList, {});
            if(data != ''){
                yield put({
                    type: 'assignPositionList',
                    data: data.data
                })
            }
        },
        * getDealList({}, {call, put}) {
            const {data} = yield call(TradeListServices.getDealList, {});
            if(data){
                yield put({
                    type: 'assignDealList',
                    data: data.data
                })
            }
        },
        * getUnDealList({}, {call, put}) {
            const {data} = yield call(TradeListServices.getUnDealList, {});
            if(data){
                yield put({
                    type: 'assignUnDealList',
                    data: data.data
                })
            }
        },
        * getHistoryList({page = 1}, {call, put}) {
            const {data} = yield call(TradeListServices.getHistoryList, {page: page});
            loading = false;
            if(data){
                yield put({
                    type: 'assignHistoryList',
                    data: data.data,
                    page: page
                })
            }
        },
        * LoadMoreHistory({},{put,select}){
            if(!loading){
                const page = yield select(state => state.tradeList.history_list.page);
                const nomore = yield select(state => state.tradeList.history_list.nomore);
                if(!nomore){
                    yield put({
                        type:'getHistoryList',
                        page:page + 1
                    })
                }
                loading = true;
            }
        },
        * getPingList({page = 1}, {call, put}) {
            const {data} = yield call(TradeListServices.getPingList, {page: page});
            loading = false
            if(data){
                yield put({
                    type: 'assignPingList',
                    data: data.data,
                    page: page
                })
            }
        },
        * LoadMorePing({},{put,select}){
            if(!loading){
                const page = yield select(state => state.tradeList.ping_list.page);
                const nomore = yield select(state => state.tradeList.ping_list.nomore);
                if(!nomore){
                    yield put({
                        type:'getPingList',
                        page:page + 1
                    })
                }
                loading = true;
            }
        }
    },

    reducers: {
        assignPingList(state, {data, page}) {
            let nomore = false,empty = false;
            if(data.length === 0){
                empty = true;
            }
            if(data.length === 0 || data.length < 30){
                nomore = true;
            }
            if(page === 1){
                return {
                    ...state,
                    ping_list:{
                        list:[...data],
                        page:1,
                        nomore:nomore,
                        empty:empty
                    }
                }
            }else{
                return {
                    ...state,
                    ping_list:{
                        list:[...state.ping_list.list,...data],
                        page:page,
                        nomore:nomore
                    }
                }
            }
        },
        assignHistoryList(state, {data, page}) {
            let nomore = false,empty = false;
            if(data.length === 0){
                empty = true;
            }
            if(data.length === 0 || data.length < 30){
                nomore = true;
            }
            if(page === 1){
                return {
                    ...state,
                    history_list:{
                        list:[...data],
                        page:1,
                        nomore:nomore,
                        empty:empty
                    }
                }
            }else{
                return {
                    ...state,
                    history_list:{
                        list:[...state.history_list.list,...data],
                        page:page,
                        nomore:nomore
                    }
                }
            }
        },
        assignDealList(state, {data}) {
            return {
                ...state,
                deal_list: [...data]
            }
        },
        assignUnDealList(state, {data}) {
            return {
                ...state,
                undeal_list: [...data]
            }
        },
        assignPositionList(state, {data}) {
            if(data.length != 0){
                let earn = 0;
                data.map(item => {
                    earn += item['浮动盈亏']
                })
                const list = JSON.parse(sessionStorage.getItem(config.K_DATA_LIST));
                let k_item;
                data.map(item => {
                    k_item = list.filter(item2 => item2['合约'] === item['合约']);
                    item['当前价'] = k_item.length === 0 ? 0 : k_item[0]['最新价'];
                })
                return {
                    ...state,
                    position_list: {
                        list:[...data]
                    },
                    earn: earn
                }
            }else{
                return {
                    ...state,
                    position_list: {
                        list:[],
                        empty:true
                    },
                    earn: 0
                }
            }
        },
    },

};
