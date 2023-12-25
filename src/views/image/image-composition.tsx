import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Row, Col, Card, Button, Space, Form, InputNumber, Select } from 'antd'
import { RndNode } from '@/components/DndNode'
import { PageWrapper } from '@/components/Page'
import { IMAGE_COMPOSITION } from '@/settings/websiteSetting'
import { RichTextInput, RichTextSetting } from '@/components/RichText'
import { UploadImage } from '@/components/Upload'

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

  const [value, setValue] = useState('请输入文本')

  const handleSuccess = (url: string) => {}

  return (
    <PageWrapper plugin={IMAGE_COMPOSITION}>
      <Row gutter={12}>
        <Col span={16}>
          <Card title='合成区域' bordered={false} bodyStyle={{ height: '600px' }}>
            <div className='dnd-container' style={{ width: '100%', height: '550px', position: 'relative' }}>
              <RndNode element={config}>
                <RichTextInput value={value} onChange={val => setValue(val)} />
              </RndNode>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='设置区域' bordered={false} bodyStyle={{ height: '600px' }}>
            <Form
              colon={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign='left'
              style={{ width: '50%', margin: '0 auto' }}
            >
              <Form.Item label='选择底图'>
                <UploadImage name='选择底图' isFull onSuccess={handleSuccess} />
              </Form.Item>
              <Form.Item label='添加文本'>
                <Button block style={{ width: '100%' }}>
                  添加文本
                </Button>
              </Form.Item>
              <Form.Item label='添加图片'>
                <UploadImage name='选择图片' isFull onSuccess={handleSuccess} />
              </Form.Item>
              <Form.Item label='删除元素'>
                <Button type='primary' danger style={{ width: '100%' }}>
                  删除元素
                </Button>
              </Form.Item>
            </Form>
            <RichTextSetting textValue={value} textStyles={{}} onChangeValue={val => setValue(val)} />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ImageComposition
