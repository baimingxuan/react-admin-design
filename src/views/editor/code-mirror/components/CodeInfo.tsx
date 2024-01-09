import type { FC } from 'react'
import { Form } from 'antd'
import type { InfoState } from '../types'

interface PropState {
  info: InfoState
}

const CodeInfo: FC<PropState> = ({ info }) => {
  return (
    <div style={{ padding: '4px 8px', border: 'solid 1px #ddd' }}>
      <Form layout='inline'>
        <Form.Item label='Length'>
          <span>{info.length}</span>
        </Form.Item>
        <Form.Item label='Lines'>
          <span>{info.lines}</span>
        </Form.Item>
        <Form.Item label='Cursor'>
          <span>{info.cursor}</span>
        </Form.Item>
        <Form.Item label='Selected'>
          <span>{info.selected}</span>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CodeInfo
