import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import {
  Card,
  Button,
  Table,
  Tag,
  Space,
  Input,
  message
} from 'antd'
import { getNewsFlashSourceList } from '@/api'
import dayjs from 'dayjs'

const NewsFlashSourceList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.NewsFlashSourceType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 15 })
  const [searchValue, setSearchValue] = useState<string>('')

  const columns: ColumnsType<API.NewsFlashSourceType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '上次采集时间',
      dataIndex: 'endTime',
      align: 'center',
      render: (endTime) => {
        return <span>{dayjs(endTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '上次采集数量',
      dataIndex: 'itemsCount',
      align: 'center'
    },
    {
      title: '采集总数',
      dataIndex: 'totalCount',
      align: 'center'
    },
    {
      title: '来源地址',
      dataIndex: 'taskId',
      align: 'center',
      render: (taskId) => {
        return (
          <a style={{ color: 'blue' }}>{taskId}</a>
        )
      }
    },
    {
      title: '接口状态',
      dataIndex: 'status',
      align: 'center',
      render: (status) => {
        return status === 'success' ? <Tag color="green">正常</Tag> : status === 'failed' ? <Tag color="red">异常</Tag> : <Tag color="orange">采集中</Tag>
      }
    }
  ]
  // change page
  function handlePageChange(page: number, size: number) {
    setTableQuery({ ...tableQuery, page, size })
  }

  // fetch data
  async function fetchData(value: string) {
    setTableLoading(true)
    const res = await getNewsFlashSourceList({ pagination: tableQuery })
    console.log(res)
    if (res.code !== 0) {
      return message.error("获取数据失败,错误码:" + res.code)
    }
    const { data, pagination: { total } } = res.data
    setTableData(data)
    setTableTotal(total || 0)
    setTableLoading(false)
  }

  // fetch data when page change
  useEffect(() => {
    if (tableQuery.page !== 0 && tableQuery.size !== 0) {
      fetchData(searchValue)
    }
  }, [tableQuery.page, tableQuery.size])

  return (
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button type='primary'>执行采集任务</Button>
          <Space>
            <h3>搜索：</h3>
            <Input placeholder='请输入搜索内容' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <Button type='primary' onClick={() => fetchData(searchValue)}>搜索</Button>
            <Button type='primary' danger onClick={() => setSearchValue('')}>重置</Button>
          </Space>
        </div>
      </Card>
      <br />
      <Card bordered={false}>
        <Table
          rowKey='id'
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
        />
      </Card>
    </>
  )
}

export default NewsFlashSourceList