import Header from '../../../components/header/header'
import CSSModules from 'react-css-modules'
import styles from '../styles/edit.less'
import {Flex,Button} from 'antd-mobile'

export default CSSModules(() => (
    <div>
        <Header
            title={'编辑跟随'}
        />
        <div styleName="tip">
            选择跟随之前请仔细阅读<span styleName="agreement">《跟随协议》</span>
        </div>
        <div styleName="action">
            <Flex styleName="line">
                <Flex.Item styleName="left">
                    跟随方式
                </Flex.Item>
                <Flex.Item styleName="right">
                    <div styleName="btn1">固定手数跟随</div>
                </Flex.Item>
            </Flex>
            <Flex styleName="line">
                <Flex.Item styleName="left">
                </Flex.Item>
                <Flex.Item styleName="right">
                    <p styleName="text">无论交易员下单多少，您都按选择的固定手数跟随，最小1手</p>
                </Flex.Item>
            </Flex>
            <Flex styleName="line">
                <Flex.Item styleName="left">
                    跟随手数
                </Flex.Item>
                <Flex.Item>
                    <Flex styleName="right">
                        <Flex.Item styleName="choose-item">1手</Flex.Item>
                        <Flex.Item styleName="choose-item-active">1手</Flex.Item>
                        <Flex.Item styleName="choose-item">1手</Flex.Item>
                    </Flex>
                </Flex.Item>
            </Flex>
            <Button styleName="submit">确定</Button>
        </div>
    </div>
),styles)
