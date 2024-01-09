import { useState } from 'react'
import { Form, Button, Card, Input, Radio, Select, Table, Space, message } from 'antd'
import type { ColumnType } from 'antd/es/table'
import { PageWrapper } from '@/components/Page'
import { XLSX_PLUGIN } from '@/settings/websiteSetting'
import { useExcel } from '../useExcel'
import type { DataToSheet } from '../types'
import { tableData } from './data'

type FileType = 'xlsx' | 'csv' | 'txt'

interface FormState {
  fileName: string
  autoWidth: boolean
  fileType: FileType
}

const ExportExcel = () => {
  const { Item } = Form
  const { Group } = Radio

  const { exportDataToExcel } = useExcel()

  const formParam = {
    fileName: '',
    autoWidth: true,
    fileType: 'xlsx'
  }

  const tableColumns: ColumnType<any>[] = [
    { title: '编号', dataIndex: 'key', align: 'center' },
    { title: '姓名', dataIndex: 'name', align: 'center' },
    { title: '性别', dataIndex: 'sex', align: 'center' },
    { title: '手机', dataIndex: 'phone', align: 'center' },
    { title: '学历', dataIndex: 'education', align: 'center' },
    { title: '爱好', dataIndex: 'hobby', align: 'center' }
  ]

  const [tableSelectedKeys, setTableSelectedKeys] = useState<number[]>([])
  const [tableSelectedRows, setTableSelectedRows] = useState<object[]>([])

  function handleTableChange(selectedKeys: any[]) {
    setTableSelectedKeys(selectedKeys)
  }

  function handleTableSelect(_record: object, _selected: boolean, selectedRows: object[]) {
    setTableSelectedRows(selectedRows)
  }

  function handleTableSelectAll(_selected: boolean, selectedRows: object[]) {
    setTableSelectedRows(selectedRows)
  }

  function handleExport(values: FormState) {
    console.log('values', values)
    if (!tableSelectedRows.length) {
      message.warning('请勾选要导出的数据项！')
      return
    }
    const { fileName, autoWidth, fileType: bookType } = values

    const params: DataToSheet = {
      data: tableSelectedRows,
      header: ['编号', '姓名', '性别', '手机', '学历', '爱好'],
      key: ['key', 'name', 'sex', 'phone', 'education', 'hobby'],
      fileName,
      autoWidth,
      bookType
    }
    exportDataToExcel(params)
    setTableSelectedKeys([])
    setTableSelectedRows([])
  }

  return (
    <PageWrapper plugin={XLSX_PLUGIN}>
      <Card bordered={false}>
        <Space direction='vertical' size={16} style={{ width: '100%' }}>
          <Form layout='inline' autoComplete='off' initialValues={formParam} onFinish={handleExport}>
            <Item label='文件名:' name='fileName'>
              <Input placeholder='文件名' />
            </Item>
            <Item label='自动宽度:' name='autoWidth'>
              <Group
                options={[
                  { label: '自动', value: true },
                  { label: '固定', value: false }
                ]}
              />
            </Item>
            <Item label='文件类型:' name='fileType'>
              <Select
                options={[
                  { label: 'xlsx', value: 'xlsx' },
                  { label: 'csv', value: 'csv' },
                  { label: 'txt', value: 'txt' }
                ]}
                style={{ width: '180px' }}
              />
            </Item>
            <Item>
              <Button type='primary' htmlType='submit'>
                导出Excel
              </Button>
            </Item>
          </Form>
          <Table
            dataSource={tableData}
            columns={tableColumns}
            rowSelection={{
              selectedRowKeys: tableSelectedKeys,
              onChange: handleTableChange,
              onSelect: handleTableSelect,
              onSelectAll: handleTableSelectAll
            }}
            pagination={false}
          />
        </Space>
      </Card>
    </PageWrapper>
  )
}

export default ExportExcel
