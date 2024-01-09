import type { FC } from 'react'
import { Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { FORM_CREATE_DESIGNER } from '@/settings/websiteSetting'

const FormCreate: FC = () => {
  return (
    <PageWrapper plugin={FORM_CREATE_DESIGNER}>
      <Card bordered={false}></Card>
    </PageWrapper>
  )
}

export default FormCreate
