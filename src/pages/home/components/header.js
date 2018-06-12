import CSSModules from 'react-css-modules'
import styles from '../styles/header.less'
import {Flex} from 'antd-mobile';
import router from 'umi/router'

const Header = () => (
    <div>
        <div styleName="user-info">
            <img src='https://qhdigitaldevsh.oss-cn-shanghai.aliyuncs.com/ueditor/userPortrait.png' alt=""
                 styleName="hastip"/>
            {/*<span styleName="status">未登录</span>*/}
            <span styleName="login-in">10000.00 USDT(模拟盘)</span>
            <div styleName="topup" onClick={() => router.push('payType')}>
                充币
            </div>
        </div>
    </div>
)

export default CSSModules(Header, styles)
