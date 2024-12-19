import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import {
  type TableProps,
  Card,
  Button,
  Table,
  Tag,
  Switch,
  Popover,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message
} from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { postNewsFlashList, postChangeNewsFlashStatus, postUpdateNewsFlash, postDeleteNewsFlash } from '@/api'
import dayjs from 'dayjs'
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const NewsFlashList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.NewsFlashInfoType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 15 })
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [selectLanguage, setSelectLanguage] = useState<string>('zh')
  const [selectDate, setSelectDate] = useState<any>(null)
  const [searchValue, setSearchValue] = useState<string>('')

  const [form] = Form.useForm()
  const [modalVisibel, setModalVisibel] = useState<boolean>(false)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

  function handleSwitchChange(checked: boolean, record: API.NewsFlashInfoType) {
    if (checked) {
      Modal.confirm({
        title: '此操作将禁用标签, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '禁用',
        cancelText: '取消',
        onOk() {
          return SwitchStatus(false, record)
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
          return SwitchStatus(true, record)
        },
        onCancel() {
        }
      })
    }
  }

  const SwitchStatus = async (status: boolean, record: API.NewsFlashInfoType) => {
    return postChangeNewsFlashStatus({ id: record.id, Option: status ? "activate" : "deactivate" }).then((res: any) => {
      if (res.code === 0) {
        message.success('修改成功')
        setTableData(tableData.map((item: API.NewsFlashInfoType) => item.id === record.id ? { ...item, isActive: status } : item))
      } else {
        message.error(res.msg || '修改失败')
      }
    }).catch((err: any) => {
      message.error(err.msg || '修改失败')
    })
  }

  const columns: ColumnsType<API.NewsFlashInfoType> = [
    {
      title: '快讯ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '快讯标题',
      dataIndex: 'titleZh',
      align: 'center',
      render: (_, record: any) => {
        const content = (
          <div style={{ width: '300px' }}>
            <p>快讯内容：<br />{selectLanguage === 'zh' ? record.contentZh : record.contentEn}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color="green">{selectLanguage === 'zh' ? record.titleZh : record.titleEn}</Tag>
          </Popover>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      render: (createdAt) => {
        return <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '快讯来源',
      dataIndex: 'source',
      align: 'center',
      render: (source) => {
        return <a href={source} style={{ color: 'blue' }} target='_blank'>{source}</a>
      }
    },
    {
      title: '原文地址',
      dataIndex: 'link',
      align: 'center',
      render: (link) => {
        return <a href={link} style={{ color: 'blue' }} target='_blank'>{link}</a>
      }
    },
    {
      title: '快讯状态',
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
      render: (_, record: any) => (
        <Space>
          <Button type="dashed" onClick={() => handleEdit(record)}>
            详情
          </Button>
          <Button type="primary" onClick={() => handleEdit(record)}>
            修改
          </Button>
          <Button type="dashed" danger onClick={() => handleDelete(record.id)}>
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
    fetchData()
  }, [tableQuery])

  async function fetchData(searchValue?: string, selectDate?: any) {
    setTableLoading(true)
    postNewsFlashList({ pagination: tableQuery }).then((res: any) => {
      if (res.code !== 0) {
        return message.error(res.error)
      }
      const { data, pagination: { total } } = res.data
      setTableData(data)
      setTableTotal(total || 0)
    }).catch(() => {
      message.error('获取数据失败')
    }).finally(() => {
      setTableLoading(false)
    })
  }

  function handlePageChange(page: number, size: number) {
    setTableQuery({ ...tableQuery, page, size })
  }

  function handleEdit(record: API.NewsFlashInfoType) {
    setModalVisibel(true)
    form.setFieldsValue({ ...record })
  }

  function handleConfirm(values: any) {
    if (loadingEdit) return
    setLoadingEdit(true)
    postUpdateNewsFlash(values).then((res: any) => {
      if (res.code !== 0) {
        return message.error("修改快讯失败,错误码:" + res.code)
      }
      message.success('修改快讯成功')
      fetchData()
      setModalVisibel(false)
    }).catch(() => {
      message.error('修改快讯失败')
    }).finally(() => {
      setLoadingEdit(false)
    })
  }

  function handleCancle() {
    setModalVisibel(false)
  }

  function handleDelete(id: number) {
    if (id) {
      Modal.confirm({
        title: '此操作将删除该数据, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '删除',
        cancelText: '取消',
        onOk() {
          postDeleteNewsFlash({ ids: [id] }).then((res: any) => {
            if (res.code === 0) {
              message.success('删除成功')
              fetchData()
            } else {
              message.error(res.msg || '删除失败')
            }
          }).catch((err: any) => {
            message.error(err.msg || '删除失败')
          })
        }
      })
    } else {
      if (selectedRowKeys.length === 0) {
        message.error('请选择要删除的数据')
      } else {
        Modal.confirm({
          title: '此操作将删除选中数据, 是否继续?',
          icon: <ExclamationCircleOutlined rev={undefined} />,
          okType: 'danger',
          okText: '删除',
          cancelText: '取消',
          onOk() {
            postDeleteNewsFlash({ ids: selectedRowKeys }).then((res: any) => {
              if (res.code === 0) {
                message.success('删除成功')
                fetchData()
              } else {
                message.error(res.msg || '删除失败')
              }
            }).catch((err: any) => {
              message.error(err.msg || '删除失败')
            })
          }
        })
      }
    }
  }

  return (
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Space>
            <Button type='primary' danger onClick={() => { handleDelete(0) }}><DeleteOutlined />批量删除</Button>
            <Space>
              <h3>选择语言:</h3>
              <Select value={selectLanguage} onChange={(value) => { setSelectLanguage(value) }}>
                <Select.Option value="en">英文</Select.Option>
                <Select.Option value="zh">中文</Select.Option>
              </Select>
            </Space>
          </Space>
          <Space size={50}>
            <Space>
              <h3>筛选日期：</h3>
              <RangePicker onChange={(value) => { setSelectDate(value) }} value={selectDate} />
              <Button type='primary' onClick={() => fetchData(searchValue, selectDate)}>筛选</Button>
            </Space>
            <Space>
              <h3>搜索：</h3>
              <Input placeholder='请输入搜索内容' onChange={(e) => { setSearchValue(e.target.value) }} value={searchValue} />
              <Button type='primary' onClick={() => fetchData(searchValue, selectDate)}>搜索</Button>
              <Button type='primary' danger onClick={() => fetchData()}>重置</Button>
            </Space>
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
        <Modal
          open={modalVisibel}
          title='修改快讯'
          width='600px'
          footer={null}
          forceRender
        >
          <Form
            form={form}
            colon={false}
            labelCol={{ span: 6 }}
            labelAlign='left'
            style={{ width: '80%', margin: '0 auto' }}
            onFinish={handleConfirm}
          >
            <Form.Item label='快讯ID' name='id' hidden>
              <Input />
            </Form.Item>
            <Form.Item label='快讯标题(中文)' name='titleZh' rules={[{ required: true, message: '请输入快讯标题(中文)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(中文)' name='contentZh' rules={[{ required: true, message: '请输入快讯内容(中文)' }]}>
              <TextArea style={{ height: '200px' }} />
            </Form.Item>
            <Form.Item label='快讯标题(英文)' name='titleEn' rules={[{ required: true, message: '请输入快讯标题(英文)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(英文)' name='contentEn' rules={[{ required: true, message: '请输入快讯内容(英文)' }]}>
              <TextArea style={{ height: '200px' }} />
            </Form.Item>
            <Form.Item label='快讯状态' name='isActive'>
              <Switch checkedChildren="上线中" unCheckedChildren="已禁用" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 20, offset: 16 }}>
              <Button type='primary' htmlType="submit" loading={loadingEdit}>
                确认
              </Button>
              <Button style={{ marginLeft: '12px' }} onClick={handleCancle}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  )
}

export default NewsFlashList
