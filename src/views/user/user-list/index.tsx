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
import { getUserList, postUserIsActive } from '@/api'
import dayjs from 'dayjs'

const UserList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.UserType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 15 })
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
      title: '用户名',
      dataIndex: 'nickname',
      align: 'center',
      render: (nickname) => {
        return <Tag color='blue'>{nickname}</Tag>
      }
    },
    {
      title: 'UUID',
      dataIndex: 'uuid',
      align: 'center'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center'
    },
    {
      title: 'vsys钱包地址',
      dataIndex: 'vsysAddress',
      align: 'center',
      ellipsis: true
    },
    {
      title: 'solana钱包地址',
      dataIndex: 'solanaAddress',
      align: 'center',
      ellipsis: true
    },
    {
      title: 'ton钱包地址',
      dataIndex: 'tonAddress',
      align: 'center',
      ellipsis: true
    },
    {
      title: 'phantom钱包地址',
      dataIndex: 'phantomAddress',
      align: 'center',
      ellipsis: true
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      align: 'center',
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      render: (createdAt) => {
        return <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (updatedAt) => {
        return <span>{dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '活跃天数',
      dataIndex: 'actionDays',
      align: 'center'
    },
    {
      title: '今日活跃',
      dataIndex: 'actionToday',
      align: 'center',
      render: (actionToday) => {
        return actionToday ? <Tag color='green'>是</Tag> : <Tag color='red'>否</Tag>
      }
    },
    {
      title: '操作',
      dataIndex: 'isActive',
      align: 'center',
      render: (isActive, record) => {
        return isActive ? <Button type='primary' danger onClick={() => handleBatchBlack(record.id)}>拉黑</Button> : <Button type='primary' ghost onClick={() => handleBatchRestore(record.id)}>恢复</Button>
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
  function handlePageChange(page: number, size: number) {
    setTableQuery({ ...tableQuery, page, size })
  }

  // fetch data
  async function fetchData(value?: string) {
    setTableLoading(true)
    getUserList({ ...tableQuery, nickname: value }).then((res: any) => {
      if (res.code === 0) {
        const { data, total } = res.data
        setTableData(data)
        setTableTotal(total)
      } else {
        message.error(res.message)
      }
    }).finally(() => {
      setTableLoading(false)
    })
  }

  // fetch data when page change
  useEffect(() => {
    if (tableQuery.page !== 0 && tableQuery.size !== 0) {
      fetchData(searchValue)
    }
  }, [tableQuery.page, tableQuery.size])

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
          handleUpdateUserIsActive([id], false)
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
            handleUpdateUserIsActive(selectedRowKeys, false)
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
        handleUpdateUserIsActive([id], true)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  // update user is active
  function handleUpdateUserIsActive(ids: number[], isActive: boolean) {
    return postUserIsActive({ ids, isActive }).then((res: any) => {
      if (res.code === 0) {
        message.success('操作成功')
        fetchData(searchValue)
      } else {
        message.error(res.message)
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

export default UserList