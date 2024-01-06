import type { UploadChangeParam } from 'antd/es/upload'
import type { ColumnType } from 'antd/es/table'
import { useState } from 'react'
import { Card, Table, Upload, Space, message } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { PageWrapper } from '@/components/Page'
import { XLSX_PLUGIN } from '@/settings/websiteSetting'
import { useExcel } from './useExcel'

const ImportExcel = () => {
  const { Dragger } = Upload
  const [tableData, setTableData] = useState<object[]>([])
  const [tableColumns, setTableColumns] = useState<ColumnType<any>[]>([])
  const { readDataFromExcel } = useExcel()

  function handleChange(fileParam: UploadChangeParam) {
    const { file } = fileParam
    const rawFile = file.originFileObj

    if (!rawFile) return
    if (!/\.(xlsx|xls|csv)$/.test(rawFile.name)) {
      message.warning('Excel文件只支持.xlsx, .xls, .csv格式!')
      return
    }

    const isLimit1M = rawFile.size / 1024 / 1024 < 1
    if (!isLimit1M) {
      message.warning('上传的Excel文件大小不能超过1M!')
      return
    }

    readFile(rawFile)
  }

  function readFile(rawFile: File) {
    const reader = new FileReader()
    reader.onload = e => {
      const data = e.target && e.target.result
      const { header, results } = readDataFromExcel(data, 'array')
      const columns = header.map(key => ({ title: key, dataIndex: key, align: 'center' })) as ColumnType<any>[]
      setTableColumns(columns)
      setTableData(results as object[])
    }
    reader.readAsArrayBuffer(rawFile)
    reader.onerror = () => {
      message.error('Excel文件读取出错!')
    }
  }

  return (
    <PageWrapper plugin={XLSX_PLUGIN}>
      <Card bordered={false}>
        <Space direction='vertical' size={16} style={{ width: '100%' }}>
          <Dragger accept='.xlsx, .xls, .csv' showUploadList={false} maxCount={1} onChange={handleChange}>
            <p className='ant-upload-drag-icon' style={{ marginBottom: 0 }}>
              <CloudUploadOutlined rev={undefined} />
            </p>
            <p>
              将Excel文件拖到此处, 或<span style={{ color: '#1890ff' }}>点击上传</span>
            </p>
          </Dragger>
          <Table dataSource={tableData} columns={tableColumns} pagination={false} />
        </Space>
      </Card>
    </PageWrapper>
  )
}

export default ImportExcel
