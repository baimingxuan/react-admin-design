
// @ts-nocheck
import { Row, Col, Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { VIDEO_RES_SRC, VIDEO_PLUGIN } from '@/settings/websiteSetting'
import { Player, ControlBar, BigPlayButton, CurrentTimeDisplay, TimeDivider,
  PlaybackRateMenuButton, VolumeMenuButton } from 'video-react'
import 'video-react/dist/video-react.css'

const VideoPlayers = () => {

  return (
    <PageWrapper plugin={VIDEO_PLUGIN}>
      <Row gutter={12}>
        <Col span={12}>
          <Card title='传统视频播放器' bordered={false}>
            <video 
              src={VIDEO_RES_SRC}
              controls
              style={{width: '100%', outline: 'none'}}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title='视频播放插件' bordered={false}>
            <Player
              src={VIDEO_RES_SRC}
              fluid
              preload='auto'
              aspectRatio='16:9'
            >
              <BigPlayButton position="center" />
              <ControlBar>
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton vertical order={7.0} />
                <PlaybackRateMenuButton rates={[0.5, 1.0, 1.5, 2.0]} order={7.2} />
              </ControlBar>
            </Player>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default VideoPlayers