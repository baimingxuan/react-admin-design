import type { UploadFile } from 'antd/es/upload/interface'
import type { RcFile, UploadProps } from 'antd/es/upload'
import React, { useState } from 'react'
import { Row, Col, Card, Button, Upload, Modal } from 'antd'
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons'
import { PageWrapper } from '@/components/Page'
import { UPLOAD_COMPO } from '@/settings/websiteSetting'
import { UPLOAD_IMG_SRC, UPLOAD_IMG_SRC2 } from '@/settings/websiteSetting'

const ImageUpload: React.FC = () => {
  const { Dragger } = Upload

  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const dragImgs: UploadFile[] = [
    { uid: '-1', name: 'beautiful-girl.jpg' },
    { uid: '-2', name: 'beautiful-sunshine.jpg' }
  ]
  const [listImgs, setListImgs] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'beautiful-girl.jpg',
      status: 'done',
      url: UPLOAD_IMG_SRC,
      thumbUrl: UPLOAD_IMG_SRC
    },
    {
      uid: '-2',
      name: 'beautiful-sunshine.jpg',
      status: 'done',
      url: UPLOAD_IMG_SRC2,
      thumbUrl: UPLOAD_IMG_SRC2
    }
  ])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj as RcFile)) as string
    }
    setPreviewImage(file.url || (file.preview as string))
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const getBase64 = (file: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setListImgs(newFileList)

  const handleCancle = () => {
    setPreviewVisible(false)
    setPreviewTitle('')
  }

  return (
    <PageWrapper plugin={UPLOAD_COMPO}>
      <Row gutter={12}>
        <Col span={8}>
          <Card title='拖拽上传' bordered={false} bodyStyle={{ height: '300px' }}>
            <Dragger
              defaultFileList={dragImgs}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              accept='.jpg, .jpeg, .gif, .png, .bmp'
              multiple
            >
              <p className='ant-upload-drag-icon' style={{ marginBottom: 0 }}>
                <CloudUploadOutlined rev={undefined} />
              </p>
              <p>
                将图片拖到此处, 或<span style={{ color: '#1890ff' }}>点击上传</span>
              </p>
              <p className='ant-upload-hint'>只能上传jpg、jpeg、gif、png、bmp文件, 且不超过500kb</p>
            </Dragger>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='列表样式' bordered={false} bodyStyle={{ height: '300px' }}>
            <Upload
              defaultFileList={[...listImgs]}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              accept='.jpg, .jpeg, .gif, .png, .bmp'
              listType='picture'
              className='list-upload'
            >
              <Button type='primary'>
                <CloudUploadOutlined rev={undefined} />
                <span>点击上传</span>
              </Button>
              <p className='ant-upload-hint'>只能上传jpg、jpeg、gif、png、bmp文件, 且不超过500kb</p>
            </Upload>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='照片墙' bordered={false} bodyStyle={{ height: '300px' }}>
            <Upload
              fileList={listImgs}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              accept='.jpg, .jpeg, .gif, .png, .bmp'
              listType='picture-card'
              className='list-upload'
              onPreview={handlePreview}
              onChange={handleChange}
            >
              <div>
                <PlusOutlined rev={undefined} />
                <div style={{ marginTop: '8px' }}>点击上传</div>
              </div>
            </Upload>
          </Card>
          <Modal open={previewVisible} title={previewTitle} footer={null} onCancel={handleCancle}>
            <img src={previewImage} style={{ width: '100%' }} />
          </Modal>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ImageUpload
