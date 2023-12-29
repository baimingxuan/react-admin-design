import type { FC } from 'react'
import type { MenuProps } from 'antd'
import type { styleState } from '@/types'
import { Form, Button, Space, Select, ColorPicker, Dropdown } from 'antd'
import RichTextInput from './RichTextInput'
import SvgIcon from '@/components/SvgIcon'

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
  const handleTextAlign: MenuProps['onClick'] = ({ key }) => {
    onChangeStyles?.({ ...textStyles, textAlign: key })
  }

  const handleChangeStyle = (type: 'fontWeight' | 'fontStyle' | 'textShadow', val: string) => {
    let styleVal = ''
    switch (type) {
      case 'fontWeight':
        styleVal = val ? '' : 'bold'
        break
      case 'fontStyle':
        styleVal = val ? '' : 'italic'
        break
      case 'textShadow':
        styleVal = val ? '' : '1px 1px 1px #333'
        break
    }
    onChangeStyles?.({ ...textStyles, [type]: styleVal ? styleVal : '' })
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
        <RichTextInput value={textValue} hasBorder onChange={val => onChangeValue(val)} />
      </Form.Item>
      <Form.Item label='字体'>
        <Select
          value={textStyles.fontFamily}
          onChange={(value: string) => onChangeStyles?.({ ...textStyles, fontFamily: value })}
        >
          {['黑体', '宋体', '楷体', '隶书', '微软雅黑', '华文行楷', '方正姚体'].map(item => {
            return (
              <Select.Option value={item} key={item} style={{ fontFamily: item }}>
                {item}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label='字号'>
        <Select
          value={textStyles.fontSize}
          onChange={(value: string) => onChangeStyles?.({ ...textStyles, fontSize: value, lineHeight: value })}
        >
          {[12, 14, 16, 20, 24, 32, 48].map(item => {
            return (
              <Select.Option value={item + 'px'} key={item} style={{ fontSize: item + 'px' }}>
                {item + 'px'}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label='样式'>
        <Space size={6}>
          <ColorPicker onChange={(_, hex: string) => onChangeStyles?.({ ...textStyles, color: hex })}>
            <Button icon={<SvgIcon name='color-font' size={20} />} style={{ color: textStyles.color }} />
          </ColorPicker>
          <ColorPicker onChange={(_, hex: string) => onChangeStyles?.({ ...textStyles, backgroundColor: hex })}>
            <Button icon={<SvgIcon name='color-bg' size={20} />} style={{ color: textStyles.backgroundColor }} />
          </ColorPicker>
          <Button
            icon={<SvgIcon name='font-bold' size={20} />}
            style={{ color: textStyles.fontWeight ? '#1890ff' : '' }}
            onClick={() => handleChangeStyle('fontWeight', textStyles.fontWeight!)}
          />
          <Button
            icon={<SvgIcon name='font-italic' size={20} />}
            style={{ color: textStyles.fontStyle ? '#1890ff' : '' }}
            onClick={() => handleChangeStyle('fontStyle', textStyles.fontStyle!)}
          />
          <Button
            icon={<SvgIcon name='font-shadow' size={20} />}
            style={{ color: textStyles.textShadow ? '#1890ff' : '' }}
            onClick={() => handleChangeStyle('textShadow', textStyles.textShadow!)}
          />
          <Dropdown
            menu={{ items: alignItems, selectedKeys: [textStyles.textAlign!], onClick: handleTextAlign }}
            placement='bottomRight'
            trigger={['click']}
          >
            <Button icon={<SvgIcon name='font-align' size={20} />} />
          </Dropdown>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default RichTextSetting
