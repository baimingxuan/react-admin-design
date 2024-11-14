import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import {
  type TableProps,
  Card,
  Button,
  Table,
  Tag,
  Switch,
  Space,
  Modal,
  Input,
  message,
  Form
} from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { getInformationLabelList, } from '@/api'
import dayjs from 'dayjs'

const InformationLabelList: FC = () => {
  const [form] = Form.useForm()
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.InformationLabelType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ current: 1, pageSize: 15 })
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [loadingSwitchId, setLoadingSwitchId] = useState<number>(-1)
  const [showAddTable, setShowAddTable] = useState<boolean>(false)
  const columns: ColumnsType<API.InformationLabelType> = [
    {
      title: '标签ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '标签名称',
      dataIndex: 'label_name',
      align: 'center',
      render: (label_name) => {
        return (
          <Tag color="orange">{label_name}</Tag>
        )
      }
    },
    {
      title: '创建人',
      dataIndex: 'create_user',
      align: 'center',
      render: (create_user) => {
        return (
          <Tag color='blue'>{create_user}</Tag>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      align: 'center',
      render: (create_time) => {
        return <span>{dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '标签禁用状态',
      dataIndex: 'label_status',
      align: 'center',
      render: (label_status, record) => (
        <Switch checkedChildren="上线中" unCheckedChildren="已禁用" loading={loadingSwitchId == record.id} checked={label_status} onClick={() => handleSwitchChange(label_status, record)} />
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record: API.InformationLabelType) => (
        <Space>
          <Button type="dashed" danger onClick={() => { handleDelete(record.id) }}>
            删除
          </Button>
        </Space>
      )
    }
  ]

  const tableSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: any[]) => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }

  useEffect(() => {
    if (tableQuery.current !== 0 && tableQuery.pageSize !== 0) {
      fetchData()
    }
  }, [tableQuery.current, tableQuery.pageSize])

  async function fetchData() {
    setTableLoading(true)
    const data = await getInformationLabelList(tableQuery)
    const { list, total } = data as unknown as API.APIResult
    setTableData(list)
    setTableTotal(total)
    setTableLoading(false)
  }

  function handlePageChange(page: number, pageSize: number) {
    setTableQuery({ ...tableQuery, current: page, pageSize })
  }

  function handleDelete(id: number) {
    if (id) {
      Modal.confirm({
        title: '此操作将删除该标签, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '删除',
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
        message.error('请选择要删除的标签')
      } else {
        Modal.confirm({
          title: '此操作将删除选中标签, 是否继续?',
          icon: <ExclamationCircleOutlined rev={undefined} />,
          okType: 'danger',
          okText: '删除',
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

  function handleSwitchChange(checked: boolean, record: API.InformationLabelType) {
    setLoadingSwitchId(record.id)
    console.log(checked)
  }

  const onFinish = (values: any) => {
    console.log('Success:', values)
    setShowAddTable(false)
  }

  return (
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Space>
            <Button type='primary' onClick={() => { setShowAddTable(true) }}><PlusOutlined />新增标签</Button>
            <Button type='primary' danger onClick={() => { handleDelete(0) }}><DeleteOutlined />批量删除</Button>
          </Space>
          <Space>
            <h3>搜索：</h3>
            <Input placeholder='请输入搜索内容' />
            <Button type='primary'>搜索</Button>
            <Button type='primary' danger>重置</Button>
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
        <Modal
          open={loadingSwitchId !== -1}
          title='禁用标签'
          width='400px'
          okText='禁用'
          cancelText='取消'
          onCancel={() => setLoadingSwitchId(-1)}
          onOk={() => setLoadingSwitchId(-1)}
        >
          标签被禁用后线上将不再显示，推荐位也不会显示该标签
        </Modal>
        <Modal
          open={showAddTable}
          title='新增标签'
          closable={false}
          footer={null}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item label='标签名称' name='label_name' rules={[{ required: true, message: '请输入标签名称' }, { max: 6, message: '标签名称长度不能超过6个字符' }]}>
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 14 }}>
              <Button type='primary' htmlType='submit'>
                确认新增
              </Button>
              <Button style={{ marginLeft: '12px' }} onClick={() => { setShowAddTable(false) }}>
                取消新增
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  )
}

export default InformationLabelList


