import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import {
  Card,
  Button,
  Table,
  Tag,
  Space,
  Input
} from 'antd'
import { getNewsFlashSourceList } from '@/api'
import dayjs from 'dayjs'

const NewsFlashSourceList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.NewsFlashSourceType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ current: 1, pageSize: 15 })
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
      dataIndex: 'last_collect_time',
      align: 'center',
      render: (last_collect_time) => {
        return <span>{dayjs(last_collect_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '上次采集数量',
      dataIndex: 'last_collect_num',
      align: 'center'
    },
    {
      title: '采集总数',
      dataIndex: 'collect_total_num',
      align: 'center'
    },
    {
      title: '来源地址',
      dataIndex: 'source_site_url',
      align: 'center',
      render: (source_site_url) => {
        return (
          <a href={source_site_url} style={{ color: 'blue' }} target='_blank'>{source_site_url}</a>
        )
      }
    },
    {
      title: '接口状态',
      dataIndex: 'source_status',
      align: 'center',
      render: (source_status, record) => {
        return source_status ? <Tag color="green">正常</Tag> : <Tag color="red">异常</Tag>
      }
    }
  ]
  // change page
  function handlePageChange(page: number, pageSize: number) {
    setTableQuery({ ...tableQuery, current: page, pageSize })
  }

  // fetch data
  async function fetchData(value: string) {
    setTableLoading(true)
    const data = await getNewsFlashSourceList(tableQuery)
    const { list, total } = data as unknown as API.APIResult
    setTableData(list)
    setTableTotal(total)
    setTableLoading(false)
  }

  // fetch data when page change
  useEffect(() => {
    if (tableQuery.current !== 0 && tableQuery.pageSize !== 0) {
      fetchData(searchValue)
    }
  }, [tableQuery.current, tableQuery.pageSize])

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
    </>
  )
}

export default NewsFlashSourceList