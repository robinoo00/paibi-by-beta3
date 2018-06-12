import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import {getFormatTime} from "../../../utils/common";

const Example = ({nav_index,choose}) => {
    return (
        <div>
            <div style={{height:'.5rem'}}>
                <div styleName="trade-menu">
                    <ul>
                        <li onClick={choose('hold')}><a styleName={nav_index === 1 ? "choose" : ""}>持仓</a></li>
                        <li onClick={choose('undeal')}><a styleName={nav_index === 3 ? "choose" : ""}>未成交</a></li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

const mapStateToProps = state => ({
    nav_index:state.tradeList.nav_index
})

const mapDispatchToProps = (dispatch,props) => ({
    choose:index => () => {
        dispatch({
            type:'tradeList/assignNavIndex',
            index:index
        })
        if(index === 'hold'){
            dispatch({
                type:'tradeList/getPositionList',
            })
        }
        if(index === 'deal'){
            dispatch({
                type:'tradeList/getDealList',
            })
        }
        if(index === 'undeal'){
            dispatch({
                type:'tradeList/getUnDealList',
            })
        }
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

