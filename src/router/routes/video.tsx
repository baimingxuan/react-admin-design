import { AppRoute } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// video module page
const VideoRoute: AppRoute = {
    path: '/video',
    element: <BasicLayout />,
    meta: {
        title: '视频处理',
        icon: 'video'
    },
    children: [
        {
            path: 'video-player',
            element: <Home />,
            meta: {
                title: '视频播放器'
            }
        },
        {
            path: 'video-mark',
            element: <Home />,
            meta: {
                title: '视频水印'
            }
        }
    ]
}

export default VideoRoute