import type { FC, CSSProperties } from 'react'
import type {
  TextElementState,
  ImageElementState,
  ElementState,
  ContainerState,
  ImageObjState,
  handlerType
} from './types'
import { useState, useMemo } from 'react'
import { useImmer } from 'use-immer'
import { Row, Col, Card, Button, Form, message } from 'antd'
import { RndNode } from '@/components/DndNode'
import { PageWrapper } from '@/components/Page'
import { VIDEO_WATERMARK } from '@/settings/websiteSetting'
import { RichTextInput, RichTextSetting } from '@/components/RichText'
import { UploadImage } from '@/components/Upload'
import { getImageSize, calcImageSize } from '@/utils/image'
import { textElement, imageElement, containerObj } from './data'

const VideoWatermark: FC = () => {
  const [container] = useImmer<ContainerState>(containerObj)
  const [elements, setElements] = useImmer<Array<ElementState>>([textElement, imageElement])
  const [activeElementTag, setActiveElementTag] = useState<string>(elements[0]?.tag || '')
  const [elementIndex, setElementIndex] = useState<number>(elements.length)

  const containerStyle: CSSProperties = useMemo(() => {
    return {
      position: 'relative',
      width: container.width,
      height: container.height
    }
  }, [container])

  const activeElement = useMemo(() => {
    return elements.find(item => item.tag === activeElementTag)
  }, [activeElementTag, elements])

  const elementHandler = (type: 'text' | 'image'): handlerType[] => {
    if (type === 'text') {
      return ['e', 'w']
    }
    return ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw']
  }

  const handleAddText = () => {
    const tagIndex = elementIndex + 1

    const textElement: TextElementState = {
      x: 300,
      y: 100,
      z: elements.length,
      w: 180,
      h: 36,
      type: 'text',
      tag: `text_${tagIndex}`,
      active: false,
      text: '请输入文本',
      style: {
        fontFamily: '微软雅黑',
        fontSize: '24px',
        lineHeight: '24px',
        color: '#687684',
        backgroundColor: '#9ac8d8',
        fontWeight: '',
        fontStyle: '',
        textShadow: '',
        textAlign: 'left'
      }
    }
    if (elements.length > 4) {
      message.warning('图片上最多叠加5个元素!')
      return
    } else {
      setElements(draft => {
        draft.push(textElement)
      })
      setElementIndex(tagIndex)
    }
  }

  const handleAddImage = (imgObj: ImageObjState) => {
    const tagIndex = elementIndex + 1

    const imageElement: ImageElementState = {
      x: 320,
      y: 260,
      z: elements.length,
      w: imgObj.width,
      h: imgObj.height,
      type: 'image',
      tag: `image_${tagIndex}`,
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
      setElementIndex(tagIndex)
    }
  }

  const handleDeleteElement = () => {
    if (!activeElementTag) {
      message.warning('请先选择元素!')
      return
    }
    const activeElementIndex = elements.findIndex(item => item.tag === activeElementTag)
    setElements(draft => {
      draft.splice(activeElementIndex, 1)
    })
    setActiveElementTag('')
  }

  const uploadImage = (url: string) => {
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

  const handleSettingText = (val: string) => {
    setElements((draft: any) => {
      draft.forEach((item: any) => {
        if (item.tag === activeElementTag) {
          item.text = val
        }
      })
    })
  }

  const handleSettingStyles = (style: any) => {
    setElements((draft: any) => {
      draft.forEach((item: any) => {
        if (item.tag === activeElementTag) {
          item.style = style
        }
      })
    })
  }

  const handleChangeElement = (ele: any, index: number) => {
    setElements((draft: any) => {
      draft[index] = ele
    })
    if (ele.active) {
      setActiveElementTag(ele.tag)
      setElements((draft: any) => {
        draft.forEach((item: any) => {
          if (item.tag !== ele.tag) {
            item.active = false
          }
        })
      })
    }
  }

  return (
    <PageWrapper plugin={VIDEO_WATERMARK}>
      <Row gutter={12}>
        <Col span={16}>
          <Card title='合成区域' bordered={false} bodyStyle={{ height: '550px' }}>
            <div className='flex-center'>
              <div className='dnd-container' style={{ ...containerStyle }}>
                <video
                  src={container.videoUrl}
                  controls
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
                {elements.map((item, index) => {
                  return (
                    <RndNode
                      key={item.tag}
                      element={item}
                      handlers={elementHandler(item.type)}
                      onChange={ele => handleChangeElement(ele, index)}
                    >
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
          <Card title='设置区域' bordered={false} bodyStyle={{ height: '550px' }}>
            <Form
              colon={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign='left'
              style={{ width: '300px', margin: '0 auto' }}
            >
              <Form.Item label='选择视频'>
                <Button
                  type='primary'
                  style={{ width: '100%' }}
                  onClick={() => message.warning('请配置视频资源服务接口！')}
                >
                  选择视频
                </Button>
              </Form.Item>
              <Form.Item label='添加文本'>
                <Button block style={{ width: '100%' }} onClick={handleAddText}>
                  添加文本
                </Button>
              </Form.Item>
              <Form.Item label='添加图片'>
                <UploadImage name='添加图片' isFull onSuccess={uploadImage} />
              </Form.Item>
              <Form.Item label='删除元素'>
                <Button type='primary' danger style={{ width: '100%' }} onClick={handleDeleteElement}>
                  删除元素
                </Button>
              </Form.Item>
            </Form>
            {activeElement && activeElement.type === 'text' ? (
              <RichTextSetting
                textValue={activeElement.text}
                textStyles={activeElement.style}
                onChangeValue={val => handleSettingText(val)}
                onChangeStyles={style => handleSettingStyles(style)}
              />
            ) : (
              <></>
            )}
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default VideoWatermark
