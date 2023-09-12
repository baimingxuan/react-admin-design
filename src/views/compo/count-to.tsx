import React, { useRef, useState } from 'react'
import { Row, Col, Card, Button, Form, Input, InputNumber, Space } from 'antd'
import { PageWrapper } from '@/components/Page'
import { CountTo } from '@/components/CountTo'
import { COUNTTO_PLUGIN } from '@/settings/websiteSetting'

const CountToPage: React.FC = () => {
  const countRef = useRef(null)

  const handleStart = () => {
    // countRef.current?.start()
  }

  const handleReset = () => {
    // countRef.current?.reset()
  }
  
  return (
    <PageWrapper plugin={COUNTTO_PLUGIN}>
      <Row gutter={12}>
        <Col span={6}>
          <Card title='正向增加' bordered={false} bodyStyle={{height: '300px'}}>
            <CountTo
              startVal={0}
              endVal={2020}
              duration={4000}
              size={40}
              style={{
                height: '100%'
              }}
              className='flex-center'
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title='自定义配置' bordered={false} bodyStyle={{height: '300px'}}>
            {/* <div className='flex-center' style={{marginBottom: '30px'}}>
              <CountTo
                ref={countRef}
                startVal={formRef.startVal}
                endVal={formRef.endVal}
                duration={formRef.duration}
                decimals={formRef.decimals}
                separator={formRef.separator}
                prefix={formRef.prefix}
                suffix={formRef.suffix}
                size={40}
                autoplay={false}
              />
            </div>
            <Form
              model={formRef}
              layout='inline'
              labelAlign='left'
              labelCol={{style: {width: '80px', marginBottom: '12px'}}}
            >
              <Form.Item label='startVal:' name='startVal'>
                <InputNumber
                  v-model:value={formRef.startVal}
                  min={0}
                  max={10000}
                  style={{width: '100px'}}
                />
              </Form.Item>
              <Form.Item label='endVal:' name='endVal'>
                <InputNumber
                  v-model:value={formRef.endVal}
                  min={0}
                  max={10000}
                  style={{width: '100px'}}
                />
              </Form.Item>
              <Form.Item label='duration:' name='duration'>
                <InputNumber
                  v-model:value={formRef.duration}
                  min={100}
                  max={100000}
                  style={{width: '100px'}}
                />
              </Form.Item>
              <Form.Item label='decimals:' name='decimals'>
                <InputNumber
                  v-model:value={formRef.decimals}
                  min={0}
                  max={100}
                  style={{width: '100px'}}
                />
              </Form.Item>
              <Form.Item label='separator:' name='separator'>
                <Input v-model:value={formRef.separator} style={{width: '100px'}} />
              </Form.Item>
              <Form.Item label='prefix:' name='prefix'>
                <Input v-model:value={formRef.prefix} style={{width: '100px'}} />
              </Form.Item>
              <Form.Item label='suffix:' name='suffix'>
                <Input v-model:value={formRef.suffix} style={{width: '100px'}} />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type='primary' onClick={handleStart}>开始</Button>
                  <Button type='primary' danger onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Form> */}
          </Card>
        </Col>
        <Col span={6}>
          <Card title='反向减少' bordered={false} bodyStyle={{height: '300px'}}>
            <CountTo
              startVal={2020}
              endVal={0}
              duration={4000}
              size={40}
              color='#30b08f'
              style={{height: '100%'}}
              className='flex-center'
            />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default CountToPage