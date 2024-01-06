import type { FC } from 'react'
import { Form, Select, Checkbox } from 'antd'
import type { ConfigState } from '../types'

interface PropState {
  config: ConfigState
  valueChange: (values: any) => void
}

const CodeToolbar: FC<PropState> = ({ config, valueChange }) => {
  const [form] = Form.useForm()

  const onValuesChange = (values: any) => {
    valueChange(values)
  }

  return (
    <div
      className='flex-between-h'
      style={{
        padding: '8px',
        border: 'solid 1px #ddd'
      }}
    >
      <Form form={form} initialValues={{ ...config }} layout='inline' labelAlign='left' onValuesChange={onValuesChange}>
        <Form.Item label='language' name='language'>
          <Select
            size='small'
            options={[
              { label: 'html', value: 'html' },
              { label: 'javascript', value: 'javascript' },
              { label: 'typescript', value: 'typescript' }
            ]}
            style={{ width: '100px' }}
          />
        </Form.Item>
        <Form.Item label='autoFocus' name='autoFocus' valuePropName='checked'>
          <Checkbox />
        </Form.Item>
        <Form.Item label='indentWithTab' name='indentWithTab' valuePropName='checked'>
          <Checkbox />
        </Form.Item>
        <Form.Item label='height' name='height'>
          <Select
            size='small'
            options={[
              { label: 'auto', value: 'auto' },
              { label: '350px', value: '350px' },
              { label: '500px', value: '500px' }
            ]}
            style={{ width: '100px' }}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default CodeToolbar
