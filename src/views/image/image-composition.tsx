import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Row, Col, Card, Button, Space, Form, InputNumber, Select } from 'antd'
import { RndNode } from '@/components/DndNode'
import { PageWrapper } from '@/components/Page'
import { IMAGE_COMPOSITION } from '@/settings/websiteSetting'

const ImageComposition: FC = () => {
  const [config, setConfig] = useState({
    x: 650,
    y: 130,
    w: 180,
    h: 180,
    active: false
  })

  const handleResize = (left: number, top: number, width: number, height: number) => {
    setConfig({
      ...config,
      x: left,
      y: top,
      w: width,
      h: height
    })
  }

  return (
    <PageWrapper plugin={IMAGE_COMPOSITION}>
      <Row gutter={12}>
        <Col span={16}>
          <Card title='合成区域' bordered={false} bodyStyle={{ height: '550px' }}>
            <div className='dnd-container' style={{ width: '100%', height: '500px', position: 'relative' }}>
              <RndNode element={config}>
                <div style={{ height: '100%', background: 'red' }}></div>
              </RndNode>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='设置区域' bordered={false} bodyStyle={{ height: '550px' }}></Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ImageComposition
