import { lazy } from 'react'
import { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
// import { LazyLoad } from '@/components/LazyLoad'
import VideoPlayer from '@/views/video/video-player'
import VideoWatermark from '@/views/video/video-watermark'

// video module page
const VideoRoute: RouteObject = {
  path: '/video',
  name: 'Video',
  element: <LayoutGuard />,
  meta: {
    title: '视频处理',
    icon: 'video',
    orderNo: 5
  },
  children: [
    {
      path: 'video-player',
      name: 'VideoPlayer',
      element: <VideoPlayer />,
      // element: LazyLoad(lazy(() => import('@/views/video/video-player'))),
      meta: {
        title: '视频播放器',
        key: 'videoPlayer'
      }
    },
    {
      path: 'video-watermark',
      name: 'VideoWatermark',
      element: <VideoWatermark />,
      // element: LazyLoad(lazy(() => import('@/views/video/video-watermark'))),
      meta: {
        title: '视频水印',
        key: 'videoWatermark'
      }
    }
  ]
}

export default VideoRoute
