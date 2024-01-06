import React, { useRef, useState } from 'react'
import { Row, Col, Card, Button, Space } from 'antd'
import { PageWrapper } from '@/components/Page'
import { REACT_CROPPER_PLUGIN, CROPPER_IMG_SRC } from '@/settings/websiteSetting'
import Cropper, { type ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { downloadImgByUrl } from '@/utils/download'
import { UploadImage } from '@/components/Upload'

const ImageCropper: React.FC = () => {
  const cropperRef = useRef<ReactCropperElement>(null)
  const [imgSrc, setImgSrc] = useState(CROPPER_IMG_SRC)

  const handleSuccess = (data: any) => {
    setImgSrc(data)
  }

  const downloadImage = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const imgUrl = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()

      downloadImgByUrl(imgUrl, 'demo.png')
    }
  }

  return (
    <PageWrapper plugin={REACT_CROPPER_PLUGIN}>
      <Row gutter={12}>
        <Col span={10}>
          <Card title='裁剪区域' bordered={false} bodyStyle={{ height: '400px' }}>
            <Cropper
              ref={cropperRef}
              src={imgSrc}
              initialAspectRatio={3 / 2}
              autoCrop={true}
              responsive={true}
              guides={true}
              autoCropArea={0.6}
              preview='.img-preview'
              style={{
                height: '100%',
                width: '100%'
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card title='设置区域' bordered={false}>
            <div className='flex-center' style={{ height: '352px' }}>
              <Space direction='vertical'>
                <UploadImage onSuccess={handleSuccess} />
                <Button type='primary' onClick={downloadImage}>
                  下载图片
                </Button>
              </Space>
            </div>
          </Card>
        </Col>
        <Col span={10}>
          <Card title='预览区域' bordered={false} bodyStyle={{ height: '400px' }}>
            <div
              className='img-preview'
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                margin: 'auto'
              }}
            />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ImageCropper
