import CSSModules from 'react-css-modules'
import styles from '../styles/news2.less'
import React from 'react'
import {ListView} from 'antd-mobile'
import ReactDOM from 'react-dom'

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(props.list),
        };
    }

    componentDidMount() {
        const {list} = this.props;
    }

    renderRow(row) {
        return (
            <li>
                <div className={styles.timeline}>
                    <div className={styles.dotbg}>
                        <div className={styles.dot}></div>
                    </div>
                    <div className={styles.time}>{row.时间}</div>
                </div>
                <div className={styles.onlytxt}>
                    <div>
                        <div dangerouslySetInnerHTML={{
                            __html: row.内容
                        }}></div>
                    </div>
                </div>
            </li>
        )
    }

    onEndReached = (event) => {
        console.log('reach end', event);
    }

    render() {
        const hei = document.body.offsetHeight - 126;
        return (
            <div styleName="mod-news-wrap">
                <div styleName="timecon">
                    <ul styleName="livecon">
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={50}
                            onScroll={() => {
                                console.log('scroll');
                            }}
                            scrollRenderAheadDistance={500}
                            style={{
                                height: hei + 'px',
                                overflow: 'auto',
                            }}
                        />
                    </ul>
                </div>
            </div>
        )
    }
}

export default CSSModules(NewsList, styles)
