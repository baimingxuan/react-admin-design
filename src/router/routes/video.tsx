import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import BlankPage from '@/views/blank'
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
      element: <BlankPage />,
      meta: {
        title: '视频水印',
        key: 'videoMark'
      }
    }
  ]
}

export default VideoRoute
