import type { ColumnsType } from 'antd/es/table'
import { type FC, useState } from 'react'
import {
  type TableProps,
  Card,
  Table,
} from 'antd'
import { getHomeAllList } from '@/api'
import dayjs from 'dayjs'

const TableBasic: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.HomeAllDataType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 10 })


  const columns: ColumnsType<API.HomeAllDataType> = [
    {
      title: '日期',
      dataIndex: 'createdAt',
      align: 'center',
      render: (createdAt) => {
        return <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '新增人数（人）',
      dataIndex: 'userNumber',
      align: 'center'
    },
    {
      title: '新增资讯',
      dataIndex: 'informationNumber',
      align: 'center'
    },
    {
      title: '新增快讯',
      dataIndex: 'newsFlashNumber',
      align: 'center'
    },
    {
      title: '新增AI问答',
      dataIndex: 'aiNumber',
      align: 'center'
    },
  ]

  const tableSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: any[]) => {
      console.log(selectedRowKeys)
    }
  }

  // useEffect(() => {
  //   fetchData()
  // }, [tableQuery])

  async function fetchData() {
    setTableLoading(true)
    const res = await getHomeAllList(tableQuery)
    const { data, total } = res.data
    setTableData(data)
    setTableTotal(total)
    setTableLoading(false)
  }

  function handlePageChange(page: number, size: number) {
    setTableQuery({ ...tableQuery, page, size })
  }


  return (
    <Card bordered={false}>
      <Table
        rowKey='id'
        rowSelection={tableSelection}
        columns={columns}
        dataSource={tableData}
        loading={tableLoading}
        pagination={{
          current: tableQuery.page,
          pageSize: tableQuery.size,
          total: tableTotal,
          showTotal: () => `Total ${tableTotal} items`,
          showSizeChanger: true,
          showQuickJumper: true,
          onChange: handlePageChange
        }}
        title={() => { return <h1>数据统计表</h1> }}
      />
    </Card>
  )
}

export default TableBasic
