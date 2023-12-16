// @ts-nocheck
import { Row, Col, Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { VIDEO_RES_SRC, VIDEO_PLUGIN } from '@/settings/websiteSetting'
import { VideoReact } from '@/components/VideoReact'

const VideoPlayer = () => {
  return (
    <PageWrapper plugin={VIDEO_PLUGIN}>
      <Row gutter={12}>
        <Col span={12}>
          <Card title='传统视频播放器' bordered={false}>
            <video src={VIDEO_RES_SRC} controls style={{ width: '100%', outline: 'none' }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title='视频播放插件' bordered={false}>
            <VideoReact
              options={{
                sources: [{ src: VIDEO_RES_SRC, type: 'video/mp4' }],
                playbackRates: [0.5, 1.0, 1.5, 2.0],
                controls: true,
                fluid: true,
                loop: false,
                preload: 'auto',
                aspectRatio: '16:9'
              }}
            />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default VideoPlayer
