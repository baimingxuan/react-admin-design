import { FC } from 'react'
import { Card, Form, Row, Col, Input, InputNumber, Button, Select, DatePicker, TimePicker,
  Switch, Slider, Cascader, TreeSelect, Radio, Checkbox } from 'antd'
import { FORM_COMPO } from '@/settings/websiteSetting'
import { PageWrapper } from '@/components/Page'
import { provinceData, cityData, cascaderData, treeData, radioData, checkboxData } from './data'

const BasicForm: FC = () => {
  const [form] = Form.useForm()

  return (
    <PageWrapper plugin={FORM_COMPO}>
      <Card bordered={false}>
        <Form
          form={form}
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          style={{width: '40%', margin: '0 auto'}}
        >
          <Form.Item label='输入框(长度限制):' name='inputLimit'>
            <Input
              showCount
              maxLength={20}
              placeholder='请输入内容'
            />
          </Form.Item>
          <Form.Item label='输入框(纯数字):' name='inputNum'>
            <InputNumber
              style={{width: '100%'}}
              placeholder='请输入数字'
            />
          </Form.Item>
          <Form.Item label='输入框(密码隐藏):' name='password'>
            <Input.Password
              maxLength={16}
              autoComplete='off'
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item label='select选择器(联动):' name='selectProvince'>
            <Row gutter={12}>
              <Col span={12}>
                <Select
                  options={provinceData.map(pro => ({ value: pro }))}
                />
              </Col>
              <Col span={12}>
                <Form.Item name='selectCity'>
                  <Select
                    options={cityData[formState.selectProvince].map((city: any) => ({ value: city }))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label='日期和时间选择器:' name='dateVal'>
            <Row gutter={12}>
              <Col span={12}>
                <DatePicker
                  placeholder='选择日期'
                  style={{width: '100%'}}
                />
              </Col>
              <Col span={12}>
                <Form.Item name='timeVal'>
                  <TimePicker
                    placeholder='选择时间'
                    style={{width: '100%'}}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </PageWrapper>
  )
}

export default BasicForm
