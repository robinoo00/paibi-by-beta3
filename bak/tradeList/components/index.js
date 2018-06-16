import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import PositonList from './position-list'
import DealList from './deal-list'
import UnDealList from './undeal-list'
import HistoryList from './history-list'
import PingList from './ping-list'
import React from 'react'
import {Tabs, Badge} from 'antd-mobile'

const tabs = [
    {title: <Badge>持仓</Badge>},
    {title: <Badge>成交</Badge>},
    {title: <Badge>未成交</Badge>},
    {title: <Badge>历史</Badge>},
    {title: <Badge>平仓</Badge>},
];

class Example extends React.Component {
    render() {
        const {choose} = this.props;
        return (
            <div className="page-main">
                <Header
                    title={'交易明细'}
                />
                <div className="tradelist-tab-wrap" style={{paddingTop: '41px'}}>
                    <Tabs
                        tabs={tabs}
                        swipeable={false}
                        tabBarBackgroundColor={'#262834'}
                        initialPage={0}
                        onChange={(tab, index) => {
                            // console.log('onChange', index, tab);
                        }}
                        onTabClick={choose}
                    >
                        <PositonList/>
                        <DealList/>
                        <UnDealList/>
                        <HistoryList/>
                        <PingList/>
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => ({
    choose: (tab, index) => {
        if (index === 0) {
            dispatch({
                type: 'tradeList/getPositionList',
            })
        }
        if (index === 1) {
            dispatch({
                type: 'tradeList/getDealList',
            })
        }
        if (index === 2) {
            dispatch({
                type: 'tradeList/getUnDealList',
            })
        }
        if (index === 3) {
            dispatch({
                type: 'tradeList/getHistoryList',
            })
        }
        if (index === 4) {
            dispatch({
                type: 'tradeList/getPingList',
            })
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Example, styles))

