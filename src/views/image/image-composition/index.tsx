import type { FC, CSSProperties } from 'react'
import type { TextElementState, ImageElementState, ContainerState, ImageObjState } from './types'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useImmer } from 'use-immer'
import { Row, Col, Card, Button, Space, Form, InputNumber, Select, message } from 'antd'
import { RndNode } from '@/components/DndNode'
import { PageWrapper } from '@/components/Page'
import { IMAGE_COMPOSITION } from '@/settings/websiteSetting'
import { RichTextInput, RichTextSetting } from '@/components/RichText'
import { UploadImage } from '@/components/Upload'
import { getImageSize, calcImageSize } from '@/utils/image'
import { textElement, imageElement, containerObj } from './data'

const ImageComposition: FC = () => {
  const [container, setContainer] = useImmer<ContainerState>(containerObj)
  const [elements, setElements] = useImmer<Array<TextElementState | ImageElementState>>([textElement, imageElement])
  const [activeElement, setActiveElement] = useState<TextElementState | ImageElementState | null>(null)
  const [elementIndex, setElementIndex] = useState<number>(elements.length)

  const containerStyle: CSSProperties = useMemo(() => {
    return {
      position: 'relative',
      width: container.width,
      height: container.height,
      backgroundImage: `url(${container.bgImgUrl})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }, [container])

  const handleAddText = () => {
    const textElement: TextElementState = {
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
    const imageElement: ImageElementState = {
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

  const changeBgImg = (url: string) => {
    getImageSize(url).then(({ width, height }) => {
      const { width: containerWidth, height: containerHeight } = calcImageSize(width, height, 850, 550)

      setContainer(draft => {
        draft.bgImgUrl = url
        draft.width = containerWidth
        draft.height = containerHeight
      })
    })
  }

  const uploadImage = (url: string) => {
    console.log(url)
    getImageSize(url).then(({ width, height }) => {
      const { width: imgWidth, height: imgHeight } = calcImageSize(
        width,
        height,
        Math.floor(container.width / 4),
        Math.floor(container.height / 4)
      )

      handleAddImage({
        url,
        width: imgWidth,
        height: imgHeight
      })
    })
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
            <div className='flex-center'>
              <div className='dnd-container' style={{ ...containerStyle }}>
                {elements.map((item, index) => {
                  return (
                    <RndNode key={item.tag} element={item}>
                      {item.type === 'text' ? (
                        <RichTextInput
                          value={item.text}
                          style={item.style}
                          onChange={val => {
                            setElements((draft: any) => {
                              draft[index].text = val
                            })
                          }}
                        />
                      ) : item.type === 'image' ? (
                        <img src={item.url} draggable='false' />
                      ) : (
                        <></>
                      )}
                    </RndNode>
                  )
                })}
              </div>
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
                <UploadImage name='选择底图' isFull onSuccess={changeBgImg} />
              </Form.Item>
              <Form.Item label='添加文本'>
                <Button block style={{ width: '100%' }} onClick={handleAddText}>
                  添加文本
                </Button>
              </Form.Item>
              <Form.Item label='添加图片'>
                <UploadImage name='选择图片' isFull onSuccess={uploadImage} />
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
