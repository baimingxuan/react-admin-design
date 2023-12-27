import type { FC } from 'react'
import type { MenuProps } from 'antd'
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
  onChangeStyles?: (style: styleState) => void
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

const RichTextSetting: FC<textState> = ({ textValue, textStyles = {}, onChangeValue, onChangeStyles }) => {
  const onClick: MenuProps['onClick'] = ({ key }) => {
    onChangeStyles?.({ ...textStyles, textAlign: key })
  }

  return (
    <Form
      colon={false}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      labelAlign='left'
      style={{ width: '300px', margin: '0 auto' }}
    >
      <Form.Item label='文本'>
        <RichTextInput value={textValue} onChange={val => onChangeValue(val)} />
      </Form.Item>
      <Form.Item label='字体'>
        <Select
          value={textStyles.fontFamily}
          options={['黑体', '宋体', '楷体', '隶书', '微软雅黑', '华文行楷', '方正姚体'].map(item => ({
            value: item,
            label: item
          }))}
          onChange={(value: string) => onChangeStyles?.({ ...textStyles, fontFamily: value })}
        />
      </Form.Item>
      <Form.Item label='字号'>
        <Select
          value={textStyles.fontSize}
          options={[12, 14, 16, 18, 24, 32, 48].map(item => ({
            value: item + 'px',
            label: item + 'px'
          }))}
          onChange={(value: string) => onChangeStyles?.({ ...textStyles, fontSize: value })}
        />
      </Form.Item>
      <Form.Item label='颜色'>
        <Space size={6}>
          <ColorPicker onChange={(_, hex: string) => onChangeStyles?.({ ...textStyles, color: hex })}>
            <Button icon={<SvgIcon name='color-font' size={20} />} style={{ color: textStyles.color }} />
          </ColorPicker>
          <ColorPicker onChange={(_, hex: string) => onChangeStyles?.({ ...textStyles, backgroundColor: hex })}>
            <Button icon={<SvgIcon name='color-bg' size={20} />} style={{ color: textStyles.backgroundColor }} />
          </ColorPicker>
          <Button icon={<SvgIcon name='font-bold' size={20} />} />
          <Dropdown
            menu={{ items: alignItems, selectedKeys: [textStyles.textAlign!], onClick }}
            placement='bottomRight'
            trigger={['click']}
          >
            <Button icon={<SvgIcon name='font-h-align' size={20} />} />
          </Dropdown>
          <Button icon={<SvgIcon name='font-italic' size={20} />} />
          <Button icon={<SvgIcon name='font-v-align' size={20} />} />
        </Space>
      </Form.Item>
    </Form>
  )
}

export default RichTextSetting
