import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Empty from './empty'

const Example = ({list,reBuildDate}) => {
    return (
        <div>
            {list.length === 0 ? <Empty/> : ''}
        </div>
    );
};

const mapStateToProps = state => ({
    list:state.tradeList.undeal_list
})

const mapDispatchToProps = (dispatch,props) => ({
})



export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example, styles))

