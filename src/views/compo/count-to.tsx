import React, { useRef, useState } from 'react'
import { Row, Col, Card, Button, Form, Input, InputNumber, Space } from 'antd'
import { PageWrapper } from '@/components/Page'
import CountUp from 'react-countup'
import { COUNTTO_PLUGIN } from '@/settings/websiteSetting'

const CountToPage: React.FC = () => {
  const [form] = Form.useForm()
  const [formData, setFromData] = useState({
    startVal: 0,
    endVal: 2020,
    duration: 4,
    decimals: 0,
    separator: ',',
    prefix: '￥ ',
    suffix: ' rmb'
  })

  const onFinish = (values: any) => {
    setFromData({...formData, ...values})
    console.log('values', values)
  }

  const handleReset = () => {
    // countRef.current?.reset()
  }
  
  return (
    <PageWrapper plugin={COUNTTO_PLUGIN}>
      <Row gutter={12}>
        <Col span={6}>
          <Card title='正向增加' bordered={false} bodyStyle={{height: '300px'}}>
            <CountUp
              start={0}
              end={2020}
              duration={4}
              style={{
                height: '100%',
                fontSize: '40px',
                color: '#e65d6e'
              }}
              className='flex-center'
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title='自定义配置' bordered={false} bodyStyle={{height: '300px'}}>
            <div className='flex-center' style={{marginBottom: '30px'}}>
              <CountUp
                // ref={countRef}
                start={formData.startVal}
                end={formData.endVal}
                duration={formData.duration}
                decimals={formData.decimals}
                separator={formData.separator}
                prefix={formData.prefix}
                suffix={formData.suffix}
                style={{
                  fontSize: '40px',
                  color: '#e65d6e'
                }}
                onReset={handleReset}
              />
            </div>
            <Form
              form={form}
              initialValues={{...formData}}
              layout='inline'
              labelAlign='left'
              labelCol={{style: {width: '80px', marginBottom: '12px'}}}
              onFinish={onFinish}
            >
              <Form.Item label='startVal:' name='startVal'>
                <InputNumber
                  min={0}
                  max={10000}
                  style={{width: '100px'}}
                />
              </Form.Item>
              <Form.Item label='endVal:' name='endVal'>
                <InputNumber
                  min={0}
                  max={10000}
                  style={{width: '100px'}}
                />
              </Form.Item>
              <Form.Item label='duration:' name='duration'>
                <InputNumber
                  min={1}
                  max={100}
                  style={{width: '100px'}}
                />
              </Form.Item>
              <Form.Item label='decimals:' name='decimals'>
                <InputNumber
                  min={0}
                  max={100}
                  style={{width: '100px'}}
                />
              </Form.Item>
              <Form.Item label='separator:' name='separator'>
                <Input style={{width: '100px'}} />
              </Form.Item>
              <Form.Item label='prefix:' name='prefix'>
                <Input style={{width: '100px'}} />
              </Form.Item>
              <Form.Item label='suffix:' name='suffix'>
                <Input style={{width: '100px'}} />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type='primary' htmlType="submit">开始</Button>
                  <Button type='primary' danger onClick={handleReset}>重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='反向减少' bordered={false} bodyStyle={{height: '300px'}}>
            <CountUp
              start={2020}
              end={0}
              duration={4}
              style={{
                height: '100%',
                fontSize: '40px',
                color: '#30b08f'
              }}
              className='flex-center'
            />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default CountToPage