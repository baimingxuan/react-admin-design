import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'
import VideoPlayer from '@/views/video/video-player'

// video module page
const VideoRoute: RouteObject = {
    path: '/video',
    element: <BasicLayout />,
    meta: {
        title: '视频处理',
        icon: 'video',
        orderNo: 5
    },
    children: [
        {
            path: 'video-player',
            element: <VideoPlayer />,
            meta: {
                title: '视频播放器',
                key: 'videoPlayer'
            }
        },
        {
            path: 'video-mark',
            element: <Home />,
            meta: {
                title: '视频水印',
                key: 'videoMark'
            }
        }
    ]
}

export default VideoRoute