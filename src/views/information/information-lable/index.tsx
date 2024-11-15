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
  Form,
  Select
} from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { getInformationLabelList, } from '@/api'
import dayjs from 'dayjs'

const InformationLabelList: FC = () => {
  const [form] = Form.useForm()
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.InformationLabelType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ current: 1, pageSize: 10 })
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [showAddTable, setShowAddTable] = useState<boolean>(false)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

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
      title: '更新人',
      dataIndex: 'update_user',
      align: 'center',
      render: (update_user) => {
        return (
          <Tag color='blue'>{update_user}</Tag>
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
      title: '更新时间',
      dataIndex: "update_time",
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
        <Switch checkedChildren="上线中" unCheckedChildren="已禁用" checked={label_status} onClick={() => handleSwitchChange(label_status, record)} />
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record: API.InformationLabelType) => (
        <Space>
          <Button type='primary' onClick={() => { handleEdit(record.id) }}>修改</Button>
          <Button type="dashed" danger onClick={() => { handleDelete([record.id]) }}>删除</Button>
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
      fetchData(searchValue)
    }
  }, [tableQuery.current, tableQuery.pageSize])

  async function fetchData(searchValue: string) {
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

  function handleSwitchChange(checked: boolean, record: API.InformationLabelType) {
    if (checked) {
      Modal.confirm({
        title: '此操作将禁用标签, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '禁用',
        cancelText: '取消',
        onOk() {
          return SwitchStatus(!checked, record)
        },
        onCancel() {
        }
      })
    } else {
      Modal.confirm({
        title: '此操作将启用标签, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '启用',
        cancelText: '取消',
        onOk() {
          return SwitchStatus(!checked, record)
        },
        onCancel() {
        }
      })
    }
  }

  function handleEdit(id: number) {
    form.setFieldsValue(tableData.find(item => item.id === id))
    setShowAddTable(true)
  }

  function handleDelete(ids: number[]) {
    if (ids.length > 0) {
      Modal.confirm({
        title: '此操作将删除该标签, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '删除',
        cancelText: '取消',
        onOk() {
          return Delete(ids)
        },
        onCancel() {
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
            return Delete(selectedRowKeys)
          },
          onCancel() {
          }
        })
      }
    }
  }

  const SwitchStatus = async (status: boolean, record: API.InformationLabelType) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1000);
    }).catch(() => console.log('Oops errors!')).then(() => {
      setTableData(tableData.map(item => item.id === record.id ? { ...item, label_status: status } : item))
    })
  }

  const onFinishEdit = async (values: any) => {
    setLoadingEdit(true)
    if (values.create_user) {
      return Edit(values)
    } else {
      return Add(values)
    }
  }

  const Edit = async (values: any) => {
    setTimeout(() => {
      setLoadingEdit(false)
      setShowAddTable(false)
    }, 1000);
  }

  const Add = async (values: any) => {
    setTimeout(() => {
      setLoadingEdit(false)
      setShowAddTable(false)
    }, 1000);
  }

  const Delete = async (ids: number[]) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1000);
    }).catch(() => {
      message.error('操作失败')
    }).then(() => {
      setTableData(tableData.filter(item => !ids.includes(item.id)))
      message.success('操作成功')
    })
  }

  return (
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Space>
            <Button type='primary' onClick={() => { setShowAddTable(true); form.resetFields() }}><PlusOutlined />新增标签</Button>
            <Button type='primary' danger onClick={() => { handleDelete([]) }}><DeleteOutlined />批量删除</Button>
          </Space>
          <Space>
            <h3>搜索：</h3>
            <Input placeholder='请输入搜索内容' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
            <Button type='primary' onClick={() => { fetchData(searchValue) }}>搜索</Button>
            <Button type='primary' danger onClick={() => { setSearchValue(''); fetchData('') }}>重置</Button>
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
          open={showAddTable}
          title={form.getFieldValue('create_user') ? '修改标签' : '新增标签'}
          closable={false}
          footer={null}
          forceRender
        >
          <Form form={form} onFinish={onFinishEdit}>
            <Form.Item label='标签名称' name='label_name' rules={[{ required: true, message: '请输入标签名称' }, { max: 6, message: '标签名称长度不能超过6个字符' }]}>
              <Input />
            </Form.Item>
            {form.getFieldValue('create_user') ? (
              <>
                <Form.Item label='标签状态' name='label_status' rules={[{ required: true, message: '请选择标签状态' }]}>
                  <Select options={[{ label: '上线中', value: true }, { label: '已禁用', value: false }]} />
                </Form.Item>
                <Form.Item label='标签ID' name='id' hidden>
                  <Input />
                </Form.Item>
                <Form.Item label='创建人' hidden name='create_user'>
                  <Input disabled />
                </Form.Item>
              </>
            ) : null}
            <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
              <Button loading={loadingEdit} type='primary' htmlType='submit'>
                确认{form.getFieldValue('create_user') ? '修改' : '新增'}
              </Button>
              <Button style={{ marginLeft: '12px' }} onClick={() => { setShowAddTable(false) }}>
                取消{form.getFieldValue('create_user') ? '修改' : '新增'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  )
}

export default InformationLabelList


