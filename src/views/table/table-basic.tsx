import { useState, useEffect } from 'react'
import { Button, Table, Tag, Select, Switch, Popover, Space, Modal, Pagination, TableProps } from 'antd'
import { ColumnType, TablePaginationConfig } from 'antd/es/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TABLE_COMPO } from '@/settings/websiteSetting'
import { getTableList } from '@/api'
import { PageWrapper } from '@/components/Page'

interface APIResult {
  list: any[],
  total: number
}

interface pageState {
  current: number
  pageSize: number
}

const marriedOptions = [
  { label: '单身', value: 0 },
  { label: '未婚', value: 1 },
  { label: '已婚', value: 2 },
  { label: '离异', value: 3 }
]

const TableBasic = () => {
  const { Column } = Table

  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<any[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<pageState>({ current: 1, pageSize: 10 })

  const tableSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: any[]) => {
      console.log(selectedRowKeys)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    fetchData()
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
      <>
        <Table
          rowSelection={tableSelection}
          dataSource={tableData}
          loading={tableLoading}
        >
          <Column
            title='编号'
            dataIndex='id'
            align='center'
            sorter
          />
          <Column
            title='姓名'
            dataIndex='name'
            align='center'
            render={
              (_, record: any) => {
                const content = (
                  <>
                    <p>姓名: {record.name}</p>
                    <p>手机: {record.phone}</p>
                    <p>爱好: {record.hobby.join('、')}</p>
                  </>
                )
                return (
                  <Popover content={content}>
                    <Tag color='blue'>{record.name}</Tag>
                  </Popover>
                )
              }
            }
          />
          <Column
            title='性别'
            dataIndex='sex'
            align='center'
          />
          <Column
            title='手机'
            dataIndex='phone'
            align='center'
          />
          <Column
            title='学历'
            dataIndex='education'
            align='center'
          />
          <Column
            title='婚姻状况'
            dataIndex='married'
            align='center'
            render={
              (_, record: any) => (
                <Select
                  options={marriedOptions}
                  defaultValue={record.married}
                  onChange={(value) => record.married = value}
                />
              )
            }
          />
          <Column
            title='禁止编辑'
            dataIndex='forbid'
            align='center'
            render={
              (_, record: any) => (
                <span>{record.hobby.join('、')}</span>
              )
            }
          />
          <Column
            title='爱好'
            dataIndex='hobby'
            align='center'
            render={
              (_, record: any) => (
                <Switch
                  defaultChecked={record.forbid}
                  onChange={(checked) => record.forbid = checked}
                />
              )
            }
          />
          <Column
            title='操作'
            key='action'
            align='center'
            render={
              (_, record: any) => (
                <Space>
                  <Button disabled={record.forbid}>编辑</Button>
                  <Button danger onClick={handleDelete}>删除</Button>
                </Space>
              )
            }
          />
        </Table>
        <Pagination
          defaultCurrent={tableQuery.current}
          defaultPageSize={tableQuery.pageSize}
          total={tableTotal}
          showSizeChanger
          showQuickJumper
          onChange={handlePageChange}
        />
      </>
    </PageWrapper>
  )
}

export default TableBasic