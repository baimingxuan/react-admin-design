import { lazy } from 'react'
import { RouteObject } from '../types'
import { BasicLayout } from '@/layout'
import lazyLoad from '../lazyLoad'

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
      element: lazyLoad(lazy(() => import('@/views/video/video-player'))),
      meta: {
        title: '视频播放器',
        key: 'videoPlayer'
      }
    },
    {
      path: 'video-mark',
      element: lazyLoad(lazy(() => import('@/views/blank'))),
      meta: {
        title: '视频水印',
        key: 'videoMark'
      }
    }
  ]
}

export default VideoRoute
