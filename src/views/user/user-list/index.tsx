import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import {
  type TableProps,
  Card,
  Button,
  Table,
  Tag,
  Space,
  Modal,
  Input,
  message
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { getUserList } from '@/api'
import dayjs from 'dayjs'

const UserList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.UserType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ current: 1, pageSize: 15 })
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  // columns
  const columns: ColumnsType<API.UserType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center'
    },
    {
      title: '钱包地址',
      dataIndex: 'wallet_address',
      align: 'center'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center',
      render: (username) => {
        return <Tag color='blue'>{username}</Tag>
      }
    },
    {
      title: '点赞（次）',
      dataIndex: 'like_num',
      align: 'center',
      sorter: (a, b) => a.like_num - b.like_num
    },
    {
      title: '收藏文章（篇）',
      dataIndex: 'collect_num',
      align: 'center',
      sorter: (a, b) => a.collect_num - b.collect_num
    },
    {
      title: 'AI互动（次）',
      dataIndex: 'ai_interaction_num',
      align: 'center',
      sorter: (a, b) => a.ai_interaction_num - b.ai_interaction_num
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      align: 'center',
      sorter: (a, b) => a.create_time.localeCompare(b.create_time),
      render: (create_time) => {
        return <span>{dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '操作',
      dataIndex: 'user_status',
      align: 'center',
      render: (user_status, record) => {
        return user_status ? <Button type='primary' danger onClick={() => handleBatchBlack(record.id)}>拉黑</Button> : <Button type='primary' ghost onClick={() => handleBatchRestore(record.id)}>恢复</Button>
      }
    }
  ]

  // selection
  const tableSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: any[]) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  // change page
  function handlePageChange(page: number, pageSize: number) {
    setTableQuery({ ...tableQuery, current: page, pageSize })
  }

  // fetch data
  async function fetchData(value: string) {
    setTableLoading(true)
    const data = await getUserList(tableQuery)
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

  // batch black
  function handleBatchBlack(id: number) {
    if (id) {
      Modal.confirm({
        title: '此操作将拉黑用户（' + id + '）是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '拉黑',
        cancelText: '取消',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    } else {
      if (selectedRowKeys.length === 0) {
        message.error('请选择要拉黑的用户')
      } else {
        Modal.confirm({
          title: '此操作将拉黑选中的用户（' + selectedRowKeys.map((id) => id).join(',') + '）是否继续?',
          icon: <ExclamationCircleOutlined rev={undefined} />,
          okType: 'danger',
          okText: '拉黑',
          cancelText: '取消',
          onOk() {
            console.log('OK')
          },
          onCancel() {
            console.log('Cancel')
          }
        })
      }
    }
  }

  // batch restore
  function handleBatchRestore(id: number) {
    Modal.confirm({
      title: '此操作将恢复选中用户（' + id + '）是否继续?',
      icon: <ExclamationCircleOutlined rev={undefined} />,
      okText: '恢复',
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
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button type='primary' onClick={() => handleBatchBlack(0)}>批量拉黑</Button>
          <Space>
            <h3>搜索：</h3>
            <Input placeholder='请输入搜索内容' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <Button type='primary' onClick={() => fetchData(searchValue)}>搜索</Button>
            <Button type='primary' danger onClick={() => { setSearchValue(''); }}>重置</Button>
          </Space>
        </div>
      </Card>
      <br />
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
    </>
  )
}

export default UserList