import CSSModules from 'react-css-modules'
import styles from '../styles/news.css'

const NewsList = ({list}) => (
    <div styleName="mod-news-wrap">
        <div styleName="timecon">
            <ul styleName="livecon">
                {list.map(item => (
                    <li key={item.id}>
                        <div>
                            <div styleName="timeline">
                                <div styleName="dotbg">
                                    <div styleName="dot"></div>
                                </div>
                                <div styleName="time">{item.时间}</div>
                            </div>
                            <div styleName="onlytxt">
                                <div>
                                    <div dangerouslySetInnerHTML={{
                                        __html: item.内容
                                    }}></div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
)


export default CSSModules(NewsList, styles)
