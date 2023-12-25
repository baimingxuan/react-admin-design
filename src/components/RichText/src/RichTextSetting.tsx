import type { FC } from 'react'
import type { MenuProps } from 'antd'
import { useState } from 'react'
import { Form, Button, Space, Select, ColorPicker, Dropdown } from 'antd'
import RichTextInput from './RichTextInput'
import SvgIcon from '@/components/SvgIcon'

export interface styleState {
  fontFamily?: string
  fontSize?: string
  color?: string
  backgroundColor?: string
  fontWeight?: string | number
  textAlign?: string
}

interface textState {
  textValue: string
  textStyles?: styleState
  onChangeValue: (val: string) => void
  onChangeStyles?: (val: styleState) => void
}

const alignItems: MenuProps['items'] = [
  {
    key: 'left',
    label: '左对齐'
  },
  {
    key: 'center',
    label: '居中'
  },
  {
    key: 'right',
    label: '右对齐'
  }
]

const RichTextSetting: FC<textState> = ({ textValue, textStyles, onChangeValue, onChangeStyles }) => {
  const [value, setValue] = useState<string>(textValue)
  const [styles, setStyles] = useState<styleState>(textStyles || {})

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(key)
  }

  return (
    <Form
      colon={false}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      labelAlign='left'
      style={{ width: '50%', margin: '0 auto' }}
    >
      <Form.Item label='文本'>
        <RichTextInput value={value} onChange={val => setValue(val)} />
      </Form.Item>
      <Form.Item label='字体'>
        <Select
          defaultValue={styles.fontFamily}
          options={['黑体', '宋体', '楷体', '隶书', '微软雅黑', '华文行楷', '方正姚体'].map(item => ({
            value: item,
            label: item
          }))}
        />
      </Form.Item>
      <Form.Item label='字号'>
        <Select
          defaultValue={styles.fontSize}
          options={[12, 14, 16, 18, 24, 32, 48].map(item => ({
            value: item + 'px',
            label: item + 'px'
          }))}
        />
      </Form.Item>
      <Form.Item label='颜色'>
        <Space>
          <ColorPicker>
            <Button icon={<SvgIcon name='color-font' size={20} />} />
          </ColorPicker>
          <ColorPicker>
            <Button icon={<SvgIcon name='color-bg' size={20} />} />
          </ColorPicker>
          <Button icon={<SvgIcon name='font-bold' size={20} />} />
          <Dropdown menu={{ items: alignItems, onClick }} placement='bottomRight' trigger={['click']}>
            <Button icon={<SvgIcon name='font-align' size={20} />} />
          </Dropdown>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default RichTextSetting
