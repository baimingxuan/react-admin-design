import type { FC } from 'react'
import { Row, Col, Card, Button, Space, Form, InputNumber, Select } from 'antd'
import { Dnd } from '@/components/DndNode'
import { PageWrapper } from '@/components/Page'
import { IMAGE_COMPOSITION } from '@/settings/websiteSetting'

const ImageComposition: FC = () => {
  return (
    <PageWrapper plugin={IMAGE_COMPOSITION}>
      <Row gutter={12}>
        <Col span={16}>
          <Card title='合成区域' bordered={false} bodyStyle={{ height: '550px' }}>
            <div style={{ width: '100%', height: '500px', position: 'relative' }}>
              <Dnd w={120} h={120} x={400} y={140} active />
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
