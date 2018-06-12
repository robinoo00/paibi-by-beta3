import {List} from 'antd-mobile'
import {removeScrollListener, scrollLoadMore, reBuildDate, reBuildTime} from "../../../utils/common";
import React from 'react'
import {connect} from 'dva'
import NoMore from '../../../components/loading-nomore/bottom-tip'

const Item = List.Item;
const Brief = Item.Brief;


class FundList extends React.Component {
    componentDidMount() {
        let {loadMore, getList} = this.props;
        getList();
        scrollLoadMore(() => {
            loadMore()
        })
    }

    componentWillUnmount() {
        removeScrollListener()
    }

    render() {
        const {...rest} = this.props;
        return (
            <div>
                {rest.list.map((item, index) => (
                    <Item
                        key={"fund_list_" + index}
                        extra={<div><p style={{fontSize: '.16rem',color:item.金额 > 0 ? '#E34C4D' : '#01B28E'}}>{item.金额}</p><p>账号:{item.账号}</p></div>}
                    ><p style={{fontSize: '.16rem', color: '#999'}}>{item.出入金方向}</p>
                        <Brief style={{fontSize: '.12rem'}}>{item.出入金日期.slice(0,10)}</Brief></Item>
                ))}
                <NoMore nomore={rest.nomore}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.fund.list,
    nomore: state.fund.nomore,
})

const mapDispatchToProps = (dispatch, props) => ({
    getList: () => {
        dispatch({
            type: 'fund/getList'
        })
    },
    loadMore:() => {
        dispatch({
            type:'fund/loadMore'
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FundList)
