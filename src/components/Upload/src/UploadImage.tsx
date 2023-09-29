import { FC } from 'react'
import type { UploadChangeParam } from 'antd/es/upload'
import { Upload, Button, message } from 'antd'

interface propState {
  onSuccess: (data: any) => void
}

const UploadImage: FC<propState> = ({ onSuccess }) => {

  const handleChange = (imageFile: UploadChangeParam) => {
    const { file } = imageFile
    const rawImage = file.originFileObj

    if (!rawImage) return
    if (!/\.(jpg|png|bmp|jpeg|webp)$/.test(rawImage.name)) {
      message.warning('图片只支持.jpg, .png, .bmp, .jpeg, .webp格式!')
      return
    }

    const isLimit1M = rawImage.size / 1024 /1024 < 5
    if (!isLimit1M) {
      message.warning('上传的图片大小不能超过5M!')
      return
    }

    readImage(rawImage)
  }

  const readImage = (image: any) => {
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target && e.target.result as any
      // Convert Array Buffer to blob if it is base64
      const result = typeof data === 'object' ? window.URL.createObjectURL(new Blob([data])) : data
      onSuccess(result)
    }
    // Convert to base64
    reader.readAsDataURL(image)
    // Convert to blob
    // reader.readAsArrayBuffer(image)
    reader.onerror = () => {
      message.error('图片读取出错!')
    }
  }

  return (
    <Upload
      action=''
      accept='.jpg, .jpeg, .gif, .png, .bmp'
      multiple={false}
      showUploadList={false}
      onChange={handleChange}
    >
      <Button type='primary'>上传图片</Button>
    </Upload>
  )
}

export default UploadImage