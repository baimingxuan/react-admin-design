import type { FC } from 'react'
import type { styleState } from '@/components/RichText/src/RichTextSetting'
import { useState, useEffect, useCallback } from 'react'
import { useImmer } from 'use-immer'
import { Row, Col, Card, Button, Space, Form, InputNumber, Select, message } from 'antd'
import { RndNode } from '@/components/DndNode'
import { PageWrapper } from '@/components/Page'
import { IMAGE_COMPOSITION, COMPOSITION_IMG_SRC, COMPOSITION_IMG_SRC2 } from '@/settings/websiteSetting'
import { RichTextInput, RichTextSetting } from '@/components/RichText'
import { UploadImage } from '@/components/Upload'

export interface baseElementState {
  x: number
  y: number
  z: number
  w: number
  h: number
  type: 'text' | 'image'
  tag: string
  active: boolean
}

export interface textElementState extends baseElementState {
  type: 'text'
  text: string
  style: styleState
}

export interface imageElementState extends baseElementState {
  type: 'image'
  url: string
}

export interface ImageObjState {
  url: string
  width: number
  height: number
}

const ImageComposition: FC = () => {
  const [elements, setElements] = useImmer<Array<textElementState | imageElementState>>([])
  const [activeElement, setActiveElement] = useState<textElementState | imageElementState | null>(null)
  const [elementIndex, setElementIndex] = useState<number>(1)

  useEffect(() => {
    handleAddText()
    handleAddImage({
      url: COMPOSITION_IMG_SRC2,
      width: 132,
      height: 132
    })
  }, [])

  const handleAddText = () => {
    const textElement: textElementState = {
      x: 300,
      y: 100,
      z: elements.length,
      w: 180,
      h: 36,
      type: 'text',
      tag: `text_${elementIndex}`,
      active: false,
      text: '请输入文本',
      style: {
        textAlign: 'left',
        fontSize: '24px',
        fontFamily: '微软雅黑',
        fontWeight: 400,
        color: '#f70707',
        backgroundColor: '#05f8e8'
      }
    }
    if (elements.length > 4) {
      message.warning('图片上最多叠加5个元素!')
      return
    } else {
      setElements(draft => {
        draft.push(textElement)
      })
      setElementIndex(elementIndex + 1)
    }
  }

  const handleAddImage = (imgObj: ImageObjState) => {
    const imageElement: imageElementState = {
      x: 320,
      y: 300,
      z: elements.length,
      w: imgObj.width,
      h: imgObj.height,
      type: 'image',
      tag: `image_${elementIndex}`,
      active: false,
      url: imgObj.url
    }
    if (elements.length > 4) {
      message.warning('图片上最多叠加5个元素!')
      return
    } else {
      setElements(draft => {
        draft.push(imageElement)
      })
      setElementIndex(elementIndex + 1)
    }
  }

  const handleDeleteElement = () => {
    if (activeElement) {
      const activeElementIndex = elements.findIndex(item => item.tag === activeElement.tag)
      setElements(draft => {
        draft.splice(activeElementIndex, 1)
      })
      setActiveElement(null)
    }
  }

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
              {elements.map((item, index) => {
                return (
                  <RndNode key={item.tag} element={item}>
                    {item.type === 'text' ? (
                      <RichTextInput
                        value={item.text}
                        styles={item.style}
                        onChange={val => {
                          setElements((draft: any) => {
                            draft[index].text = val
                          })
                        }}
                      />
                    ) : (
                      <img src={item.url} draggable='false' />
                    )}
                  </RndNode>
                )
              })}
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
