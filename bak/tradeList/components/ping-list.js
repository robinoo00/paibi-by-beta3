import CSSModules from 'react-css-modules'
import styles from '../styles/ping-list.less'
import {connect} from 'dva'
import {WhiteSpace,List,Flex} from 'antd-mobile'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";
import React from 'react'
import Empty from './empty'
import Loading from '../../../components/loading-nomore/bottom-tip'

const Item = List.Item;
const Brief = Item.Brief;

class Example extends React.Component{
    componentDidMount(){
        let {loadMore} = this.props;
        scrollLoadMore(() => {
            loadMore()
        })
    }
    componentWillUnmount(){
        removeScrollListener()
    }
    render(){
        const {...rest} = this.props;
        return(
            (
                <div styleName="wrap">
                    {(!rest.empty && rest.list.length ===0) ? <Loading/> : ''}
                    {rest.empty ? <Empty/> :""}
                    {rest.list.map((item, index) => (
                        <div styleName="item" key={"tradeList_" + index}>
                            <div styleName="line1">
                                <div styleName="info">
                                    <div styleName="info-item">
                                        <span styleName="name">{item.合约}</span>
                                        <span styleName="money">/{item.货币}</span>
                                        <span styleName={item.方向 === "买入" ? "down" : "up"}>{item.方向 === "买入" ? "买" : "卖"}</span>
                                        <span>×{item.数量}手</span>
                                    </div>
                                </div>
                                <div styleName="action">
                                    <span styleName={item.平仓赢亏 > 0 ? "up-num" : "down-num"}>{item.平仓赢亏}</span>
                                </div>
                            </div>
                            <Flex styleName="price">
                                <Flex.Item styleName="price-item">
                                    <p>{item.开仓价}</p>
                                    <p>开仓价</p>
                                </Flex.Item>
                                <Flex.Item styleName="price-item">
                                    <p style={{fontSize:'.1rem'}}>{item.开仓时间}</p>
                                    <p>开仓时间</p>
                                </Flex.Item>
                                <Flex.Item styleName="price-item">
                                    <p>{item.平仓价}</p>
                                    <p>平仓价</p>
                                </Flex.Item>
                                <Flex.Item styleName="price-item">
                                    <p style={{fontSize:'.1rem'}}>{item.平仓时间}</p>
                                    <p>平仓时间</p>
                                </Flex.Item>
                            </Flex>
                        </div>
                    ))}
                </div>
            )
        )
    }
}

const mapStateToProps = state => ({
    list:state.tradeList.ping_list.list,
    empty:state.tradeList.ping_list.empty,
})

const mapDispatchToProps = (dispatch,props) => ({
    loadMore:() => {
        dispatch({
            type:'tradeList/LoadMorePing'
        })
    }
})



export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

