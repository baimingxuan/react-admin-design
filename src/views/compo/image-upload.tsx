import React, { useState } from 'react'
import { Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { UPLOAD_COMPO } from '@/settings/websiteSetting'

const ImageUpload: React.FC = () => {

  return (
    <PageWrapper plugin={UPLOAD_COMPO}>
      <Card bordered={false}></Card>
    </PageWrapper>
  )
}

export default ImageUpload