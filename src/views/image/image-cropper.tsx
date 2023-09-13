import React, { useRef } from 'react'
import { Row, Col, Card, Button, Space } from 'antd'
import { PageWrapper } from '@/components/Page'
import { VUE_CROPPER_PLUGIN, CROPPER_IMG_SRC } from '@/settings/websiteSetting'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const ImageCropper: React.FC = () => {
  const cropperRef = useRef<ReactCropperElement>(null)

  return (
    <PageWrapper plugin={VUE_CROPPER_PLUGIN}>
      <Row gutter={12}>
        <Col span={10}>
          <Card title='裁剪区域' bordered={false} bodyStyle={{height: '400px'}}>
            <Cropper
              ref={cropperRef}
              src={CROPPER_IMG_SRC}
              initialAspectRatio={3 / 2}
              autoCrop={true}
              autoCropArea={0.6}
              preview='.image-preview'
              style={{
                height: '100%',
                width: '100%'
              }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card title='设置区域' bordered={false}>
            <div className='flex-center' style={{height: '352px'}}>
              <Space direction='vertical'>
                {/* <UploadImage onSuccess={handleSuccess} /> */}
                {/* <Button type='primary'>
                  <a onClick={downloadImage}>下载图片</a>
                </Button>
                <a ref={downloadDom} href={unref(downImg)} download='demo.png' /> */}
              </Space>
            </div>
          </Card>
        </Col>
        <Col span={10}>
          <Card title='预览区域' bordered={false} bodyStyle={{height: '400px'}}>
            <div className='image-preview'></div>
            {/* <div style={{
              width: unref(previews).w + 'px',
              height: unref(previews).h + 'px',
              overflow: 'hidden',
              margin: 'auto',
              zoom: (350 / unref(previews).h)
            }}>
              <div style={unref(previews).div}>
                <img src={unref(previews).url} style={unref(previews).img} />
              </div>
            </div> */}
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default ImageCropper