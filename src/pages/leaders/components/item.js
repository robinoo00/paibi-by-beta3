import CSSModules from 'react-css-modules'
import styles from '../styles/item.less'
import router from 'umi/router'

const Item = () =>(
    <div styleName="earnings-list-wrap">
        <div styleName="portrait-wrap">
            <img styleName="portrait" src="https://digitalsh.oss-cn-shanghai.aliyuncs.com/ueditor/1523418178796001891.png?x-oss-process=image/auto-orient,1" alt=""/>
            <p>比特出发</p>
        </div>
        <ol styleName="earnings-list-con">
            <li>
                <p styleName="earnings-num">
                    21.42%
                </p>
                <p styleName="earnings-list-txt">
                    总收益率
                </p>
            </li>
            <li>
                <p styleName="earnings-num">
                    21.42%
                </p>
                <p styleName="earnings-list-txt">
                    总收益率
                </p>
            </li>
            <li>
                <p styleName="earnings-num">
                    21.42%
                </p>
                <p styleName="earnings-list-txt">
                    总收益率
                </p>
            </li>
            <li>
                <span styleName="follow-btn" onClick={() => router.push('followEdit')}>跟随</span>
            </li>
        </ol>
    </div>
)

export default CSSModules(Item,styles)
