import Item from './item'
import {connect} from 'dva'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";
import React from 'react'

class List extends React.Component{
    componentDidMount(){
        let {loadMore,getList} = this.props;
        getList();
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
            <div>
                <Item/>
                {/*{rest.list.map(item => (*/}
                    {/*<Item/>*/}
                {/*))}*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list:state.leaders.list_earn
})

const mapDispatchToProps = dispatch => ({
    getList:() => {
        dispatch({
            type:'leaders/getList'
        })
    },
    loadMore:() => {
        dispatch({
            type:'leaders/loadMore'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(List)
