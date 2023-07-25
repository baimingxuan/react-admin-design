import { useState, useEffect } from 'react'
import { Button, Table, Tag, Select, Switch, Popover, Space, Modal, TableProps } from 'antd'
import { ColumnType, TablePaginationConfig } from 'antd/es/table'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { TABLE_COMPO } from '@/settings/websiteSetting'
import { getTableList } from '@/api'
import { PageWrapper } from '@/components/Page'

interface APIResult {
  list: any[],
  total: number
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

  const tableSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: any[]) => {
      console.log(selectedRowKeys)
    }
  }

  const tableColumns: ColumnType<any>[] = [
    { title: '婚姻状况', dataIndex: 'married', align: 'center' },
    { title: '禁止编辑', dataIndex: 'forbid', align: 'center' },
    { title: '爱好', dataIndex: 'hobby', align: 'center' },
    { title: '操作', key: 'action', align: 'center' }
  ]

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
      <Table
        rowSelection={tableSelection}
        dataSource={tableData}
        pagination={tablePagination}
        loading={tableLoading}
        onChange={handleTableChange}
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
            (_: any, record: any) => {
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
      </Table>
    </PageWrapper>
  )
}

export default TableBasic