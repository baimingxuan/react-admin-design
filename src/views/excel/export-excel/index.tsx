import { Form, Button, Card, Input, Radio, Select, Table, Space, message } from 'antd'
import { ColumnGroupType } from 'antd/es/table'
import { PageWrapper } from '@/components/Page'
import { XLSX_PLUGIN } from '@/settings/websiteSetting'
import { useExcel } from '../useExcel'
import { DataToSheet } from '../types'
import { tableData } from './data'

type FileType = 'xlsx' | 'csv' | 'txt'

interface FormState {
  fileName: string
  autoWidth: boolean
  fileType: FileType
}

const ExportExcel = (props: any) => {
  const { Item } = Form
  const { Group } = Radio

  return (
    <PageWrapper plugin={XLSX_PLUGIN}>
      <Card bordered={false}>
        <Space direction='vertical' size={16} style={{width: '100%'}}></Space>
      </Card>
    </PageWrapper>
  )
}

export default ExportExcel