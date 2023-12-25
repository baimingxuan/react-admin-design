import type { FC } from 'react'
import type { Position, DraggableData } from 'react-rnd'
import { useState } from 'react'
import { Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { REACT_RND_PLUGIN } from '@/settings/websiteSetting'
import { Rnd } from 'react-rnd'

interface configState {
  x: number
  y: number
  width: number
  height: number
}

const DragResize: FC = () => {
  const [config, setConfig] = useState<configState>({
    x: 650,
    y: 130,
    width: 180,
    height: 180
  })

  const handleDragStop = (_e: any, data: DraggableData) => {
    setConfig({
      ...config,
      x: data.x,
      y: data.y
    })
  }

  const handleResize = (_e: any, _direction: any, ref: any, _delta: any, position: Position) => {
    setConfig({
      ...config,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position
    })
  }

  return (
    <PageWrapper plugin={REACT_RND_PLUGIN}>
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <div style={{ width: '100%', height: '500px' }}>
          <Rnd
            size={{ width: config.width, height: config.height }}
            position={{ x: config.x, y: config.y }}
            minWidth={100}
            minHeight={100}
            onDragStop={handleDragStop}
            onResize={handleResize}
            bounds='parent'
            style={{ background: '#1890ff' }}
          >
            <div className='flex-center' style={{ height: '100%' }}>
              <div style={{ width: '90px', color: '#fff' }}>
                <p>x: {config.x}</p>
                <p>y: {config.y}</p>
                <p>width: {config.width}</p>
                <p>height: {config.height}</p>
              </div>
            </div>
          </Rnd>
        </div>
      </Card>
    </PageWrapper>
  )
}

export default DragResize
