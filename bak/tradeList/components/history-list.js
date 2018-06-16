import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import {WhiteSpace,List} from 'antd-mobile'
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
                <div>
                    <WhiteSpace size={"md"}/>
                    {(!rest.empty && rest.list.length ===0) ? <Loading/> : ''}
                    {rest.empty ? <Empty/> :""}
                    {rest.list.map((item,index) => (
                        <div key={"history_list_"+index}>
                            <Item
                                extra={
                                    <div>
                                        <p style={item['方向'] === "买入" ? {color:'#E34C4D'} : {color:"#01B28E"}}>{item['方向']}{item['数量']}手</p>
                                        <Brief>￥{item['价格']}</Brief>
                                    </div>}
                            >
                                <p style={{fontSize:'.17rem'}}>{item['合约']} <span style={{fontSize:'.14rem'}}>（手续费:{item['手续费']}）</span></p>
                                <Brief style={{fontSize:'.1rem'}}>{item['时间']}</Brief>
                            </Item>
                            <WhiteSpace size={"sm"}/>
                        </div>
                    ))}
                </div>
            )
        )
    }
}

const mapStateToProps = state => ({
    list:state.tradeList.history_list.list,
    empty:state.tradeList.history_list.empty,
})

const mapDispatchToProps = (dispatch,props) => ({
    loadMore:() => {
        dispatch({
            type:'tradeList/LoadMoreHistory'
        })
    }
})



export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

