import { type FC, useState } from 'react'
import { Card, Form, Radio, Switch } from 'antd'
import { PageWrapper } from '@/components/Page'
import { React_TREE_ORG_PLUGIN } from '@/settings/websiteSetting'
import OrgTree from 'react-org-tree'
import { data } from './data'

const OrgTreePage: FC = () => {
  const [form] = Form.useForm()

  const [config, setConfig] = useState({
    horizontal: false,
    expandAll: true
  })

  const onValuesChange = (values: any) => {
    setConfig({ ...config, ...values })
  }

  return (
    <PageWrapper plugin={React_TREE_ORG_PLUGIN}>
      <Card bordered={false} bodyStyle={{ minHeight: '400px' }}>
        <Form
          form={form}
          initialValues={{ ...config }}
          layout='inline'
          labelAlign='left'
          onValuesChange={onValuesChange}
        >
          <Form.Item label='排列方式：' name='horizontal'>
            <Radio.Group optionType='button' buttonStyle='solid'>
              <Radio.Button value={true}>水平</Radio.Button>
              <Radio.Button value={false}>垂直</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='展开全部：' name='expandAll' valuePropName='checked'>
            <Switch />
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
          <OrgTree data={data} collapsable={true} horizontal={config.horizontal} expandAll={config.expandAll} />
        </div>
      </Card>
    </PageWrapper>
  )
}

export default OrgTreePage
