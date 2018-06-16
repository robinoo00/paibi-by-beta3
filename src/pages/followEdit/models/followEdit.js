import * as FollowEditServices from '../services/followEdit'
import {Toast} from 'antd-mobile'
import router from 'umi/router'
import config from "../../../utils/config";

export default {
    namespace: 'followEdit',
    state: {
        id: 0,
        nickname: '',
        way: '固定手数',//跟随方式
        direct: 0,//跟随方向 0 正向 1 反向
        num: 1,//固定手数
        num1: 1,//固定倍数
        edit: false,
        editId: 0
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/followEdit') {
                    dispatch({
                        type:'assignEdit',
                        value:false
                    })
                    const id = query.id;
                    const nickname = query.nickname;
                    if (id && nickname) {
                        dispatch({
                            type: 'assignIDAndNickName',
                            id: id,
                            nickname: nickname
                        })
                    } else {
                        router.push('leaders')
                    }
                    //编辑跟随
                    if (typeof query.from != 'undefined') {
                        const from = query.from;
                        if (from === 'edit') {
                            const data = sessionStorage.getItem(config.FOLLOW_EDIT);
                            if(data){
                                dispatch({
                                    type:'assignEdit',
                                    value:true
                                })
                                dispatch({
                                    type: 'assignData',
                                    data: JSON.parse(data)
                                })
                            }else{
                                router.push('followList')
                            }
                        }
                    }
                }
            })
        }
    },
    reducers: {
        assignEdit(state, {value}) {
            return {
                ...state,
                edit: value
            }
        },
        assignData(state, {data}) {
            return {
                ...state,
                way: data.固定手数 === "0" ? "固定倍数" : "固定手数",
                direct: data.方向 === "正向" ? 0 : 1,
                num: data.固定手数 === "0" ? 1 : data.固定手数,
                num1: data.倍数,
                editId: data.记录ID,
            }
        },
        assignDirect(state, {value}) {
            return {
                ...state,
                direct: value
            }
        },
        assignNum(state, {value}) {
            return {
                ...state,
                num: value
            }
        },
        assignNum1(state, {value}) {
            return {
                ...state,
                num1: value
            }
        },
        assignWay(state, {value}) {
            return {
                ...state,
                way: value
            }
        },
        assignIDAndNickName(state, {id, nickname}) {
            return {
                ...state,
                id: id,
                nickname: nickname
            }
        }
    },
    effects: {
        * removeFollow({},{call,select}){
            const editId = yield select(state => state.followEdit.editId);
            const {data} = yield call(FollowEditServices.removeFollow,{id:editId});
            Toast.hide();
            if (data) {
                Toast.info(data.信息);
                if (data.状态) {
                    router.push('followList')
                }
            }
        },
        * follow({}, {call, select}) {
            const stateData = yield select(state => state.followEdit);
            const way = stateData.way;
            const direct = stateData.direct;
            const num = stateData.num;
            const num1 = stateData.num1;
            const id = stateData.id;
            const edit = stateData.edit;
            if(edit){
                const post_data = {
                    id: stateData.editId,
                    direct: direct,
                    num: way === '固定手数' ? num : 0,
                    num1: num1
                };
                const {data} = yield call(FollowEditServices.editFollow, post_data);
                Toast.hide();
                if (data) {
                    Toast.info(data.信息);
                    if (data.状态) {
                        router.push('followList')
                    }
                }
            }else{
                const post_data = {
                    ID: id,
                    direct: direct,
                    num: way === '固定手数' ? num : 0,
                    num1: num1
                };
                const {data} = yield call(FollowEditServices.addFollow, post_data);
                Toast.hide();
                if (data) {
                    Toast.info(data.信息);
                    if (data.状态) {
                        router.push('followList')
                    }
                }
            }

        }
    }
}
