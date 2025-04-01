import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import {
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
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { getInformationLabelList, getSearchInformationLabel, postAddInformationLabel, postUpdateInformationLabel, } from '@/api'
import dayjs from 'dayjs'

const InformationLabelList: FC = () => {
  const [form] = Form.useForm()
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.InformationLabelType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 10 })
  const [searchValue, setSearchValue] = useState<string>('')
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
      dataIndex: 'name',
      align: 'center',
      render: (name) => {
        return (
          <Tag color="orange">{name}</Tag>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      render: (createTime) => {
        return <span>{dayjs(createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '更新时间',
      dataIndex: "updatedAt",
      align: 'center',
      render: (updateTime) => {
        return <span>{dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '标签禁用状态',
      dataIndex: 'isActive',
      align: 'center',
      render: (isActive, record) => (
        <Switch checkedChildren="上线中" unCheckedChildren="已禁用" checked={isActive} onClick={() => handleSwitchChange(isActive, record)} />
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record: API.InformationLabelType) => (
        <Space>
          <Button type='primary' onClick={() => { handleEdit(record.id) }}>修改</Button>
        </Space>
      )
    }
  ]

  useEffect(() => {
    if (tableQuery.page !== 0 && tableQuery.size !== 0) {
      fetchData(searchValue)
    }
  }, [tableQuery.page, tableQuery.size])

  async function fetchData(searchValue: string) {
    setTableLoading(true)
    if (searchValue) {
      getSearchInformationLabel({ query: searchValue }).then((res: any) => {
        if (res.code !== 0) {
          return message.error("获取数据失败,错误码:" + res.code)
        }
        const { data } = res.data
        setTableData(data)
        setTableTotal(data.length)
      }).catch(() => {
        message.error('获取数据失败')
      }).finally(() => {
        setTableLoading(false)
      })
    } else {
      getInformationLabelList(tableQuery).then((res: API.InformationLabelListResult) => {
        if (res.code !== 0) {
          return message.error("获取数据失败,错误码:" + res.code)
        }
        const { data, total } = res.data
        setTableData(data)
        setTableTotal(total)
      }).catch(() => {
        message.error('获取数据失败')
      }).finally(() => {
        setTableLoading(false)
      })
    }
  }

  function handlePageChange(page: number, size: number) {
    setTableQuery({ ...tableQuery, page, size })
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


  const SwitchStatus = async (status: boolean, record: API.InformationLabelType) => {
    return postUpdateInformationLabel({ id: record.id, name: record.name, isActive: status }).then((res: any) => {
      if (res.code === 0) {
        setTableData(tableData.map(item => item.id === record.id ? { ...item, isActive: status } : item))
        message.success('操作成功')
      } else {
        message.error("修改失败,错误码:" + res.code)
      }
    }).catch(() => {
      message.error('操作失败')
    })
  }

  const onFinishEdit = async (values: any) => {
    setLoadingEdit(true)
    if (values.createdAt) {
      return Edit(values)
    } else {
      return Add(values.name)
    }
  }

  const Edit = async (values: any) => {
    postUpdateInformationLabel({ id: values.id, name: values.name, isActive: values.isActive }).then((res: any) => {
      if (res.code === 0) {
        message.success('操作成功')
        setTableData(tableData.map(item => item.id === values.id ? { ...item, name: values.name, isActive: values.isActive } : item))
      } else {
        message.error("修改失败,错误码:" + res.code)
      }
    }).catch(() => {
      message.error('操作失败')
    }).finally(() => {
      setShowAddTable(false)
      setLoadingEdit(false)
    })
  }

  const Add = async (name: string) => {
    postAddInformationLabel({ name }).then((res: any) => {
      if (res.code === 0) {
        message.success('新增成功')
        fetchData(searchValue)
      } else {
        message.error("新增失败,错误码:" + res.code)
      }
    }).catch(() => {
      message.error('新增失败')
    }).finally(() => {
      setLoadingEdit(false)
      setShowAddTable(false)
    })
  }


  return (
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Space>
            <Button type='primary' onClick={() => { setShowAddTable(true); form.resetFields() }}><PlusOutlined />新增标签</Button>
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
        <Modal
          open={showAddTable}
          title={form.getFieldValue('createdAt') ? '修改标签' : '新增标签'}
          closable={false}
          footer={null}
          forceRender
        >
          <Form form={form} onFinish={onFinishEdit}>
            <Form.Item label='标签名称' name='name' rules={[{ required: true, message: '请输入标签名称' }, { max: 12, message: '标签名称长度不能超过12个字符' }]}>
              <Input />
            </Form.Item>
            {form.getFieldValue('createdAt') ? (
              <>
                <Form.Item label='标签状态' name='isActive' rules={[{ required: true, message: '请选择标签状态' }]}>
                  <Select options={[{ label: '上线中', value: true }, { label: '已禁用', value: false }]} />
                </Form.Item>
                <Form.Item label='标签ID' name='id' hidden>
                  <Input />
                </Form.Item>
                <Form.Item label='创建时间' hidden name='createdAt'>
                  <Input disabled />
                </Form.Item>
              </>
            ) : null}
            <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
              <Button loading={loadingEdit} type='primary' htmlType='submit'>
                确认{form.getFieldValue('createdAt') ? '修改' : '新增'}
              </Button>
              <Button style={{ marginLeft: '12px' }} onClick={() => { setShowAddTable(false) }}>
                取消{form.getFieldValue('createdAt') ? '修改' : '新增'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  )
}

export default InformationLabelList


