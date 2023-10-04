import type { ColumnsType } from 'antd/es/table'
import { FC, useState, useEffect } from 'react'
import { Card, Button, Table, Tag, Select, Switch, Popover, Space, Modal, TableProps } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TABLE_COMPO } from '@/settings/websiteSetting'
import { getTableList } from '@/api'
import { PageWrapper } from '@/components/Page'
import { APIResult, PageState, TableDataType } from './types'

const marriedOptions = [
  { label: '单身', value: 0 },
  { label: '未婚', value: 1 },
  { label: '已婚', value: 2 },
  { label: '离异', value: 3 }
]

const TableBasic: FC = () => {

  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<TableDataType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<PageState>({ current: 1, pageSize: 10 })

  const columns: ColumnsType<TableDataType> = [
    {
      title: '编号',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      render: (_, record: any) => {
        const content = (
          <div>
            <p>姓名: {record.name}</p>
            <p>手机: {record.phone}</p>
            <p>爱好: {record.hobby.join('、')}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color='blue'>{record.name}</Tag>
          </Popover>
        )
      }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center'
    },
    {
      title: '手机',
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: '学历',
      dataIndex: 'education',
      align: 'center'
    },
    {
      title: '婚姻状况',
      dataIndex: 'married',
      align: 'center',
      render: (text, record: any) => (
        <Select
          options={marriedOptions}
          defaultValue={record.married}
          onChange={(value) => record.married = value}
        />
      )
    },
    {
      title: '禁止编辑',
      dataIndex: 'forbid',
      align: 'center',
      render: (_, record: any) => (
        <Switch
          defaultChecked={record.forbid}
          onChange={(checked) => record.forbid = checked}
        />
      )
    },
    {
      title: '爱好',
      dataIndex: 'hobby',
      align: 'center',
      render: (_, record: any) => (
        <span>{record.hobby.join('、')}</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record: any) => (
        <Space>
          <Button disabled={record.forbid}>编辑</Button>
          <Button danger onClick={handleDelete}>删除</Button>
        </Space>
      )
    }
  ]

  const tableSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: any[]) => {
      console.log(selectedRowKeys)
    }
  }

  useEffect(() => {
    fetchData()
  }, [tableQuery])

  async function fetchData() {
    setTableLoading(true)
    const data = await getTableList(tableQuery)
    const { list, total } = data as unknown as APIResult
    setTableData(list)
    setTableTotal(total)
    setTableLoading(false)
  }

  function handlePageChange(page: number, pageSize: number) {
    setTableQuery({ ...tableQuery, current: page, pageSize })
  }

  function handleDelete() {
    Modal.confirm({
      title: '此操作将删除选中数据, 是否继续?',
      icon: <ExclamationCircleOutlined rev={undefined} />,
      // okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  return (
    <PageWrapper plugin={TABLE_COMPO}>
      <Card bordered={false}>
        <Table
          rowKey='id'
          rowSelection={tableSelection}
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          pagination={{
            current: tableQuery.current,
            pageSize: tableQuery.pageSize,
            total: tableTotal,
            showTotal: () => `Total ${tableTotal} items`,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: handlePageChange
          }}
        />
      </Card>
    </PageWrapper>
  )
}

export default TableBasic