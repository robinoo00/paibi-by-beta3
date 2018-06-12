import CSSModules from 'react-css-modules'
import styles from '../styles/follow-list.less'
import {connect} from 'dva'

const List = () => (
    <div>list2</div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(List,styles))
