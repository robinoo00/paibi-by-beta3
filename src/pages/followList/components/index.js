import Header from '../../../components/header/header'
import {Tabs,Badge} from 'antd-mobile'
import FollowList from './follow-list'
import UnFollowList from './unfollow-list'
import {connect} from 'dva'

const tabs = [
    {title:<Badge text={2}>正在跟随</Badge>},
    {title:<Badge text={2}>已取消跟随</Badge>}
]

const Index = ({choose}) => (
    <div className={"page-main"}>
        <Header
            title={'我是跟随者'}
        />
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
            <FollowList/>
            <UnFollowList/>
        </Tabs>
        <p style={{textAlign:'center',padding:'.1rem 0'}}>
            <a href="javascript:;" style={{textDecoration:'underline',color:'#108ee9'}}>看看高手榜单></a>
        </p>
    </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    choose:() => {

    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Index)
