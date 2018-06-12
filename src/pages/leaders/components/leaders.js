import Header from '../../../components/header/header'
import {Tabs,Badge} from 'antd-mobile'
import List from './list-earn'

const tabs = [
    { title: <Badge>收益高手</Badge> },
    { title: <Badge>常胜高手</Badge> },
    { title: <Badge>人气高手</Badge> },
];

const Leaders = () => (
    <div>
        <Header
            title={'高手榜单'}
        />
        <Tabs tabs={tabs}
              initialPage={0}
              tabBarBackgroundColor={'#262834'}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
            <List/>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                Content of second tab
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                Content of third tab
            </div>
        </Tabs>
    </div>
)

export default Leaders
