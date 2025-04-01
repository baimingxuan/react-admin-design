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
  const [searchValue, setSearchValue] = useState<string>('')
  const [startDate, setStartDate] = useState<string>(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'))

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
          <div style={{ width: '300px', overflow: 'scroll', height: '300px' }}>
            <p>快讯内容：<br />{selectLanguage === 'zhHans' ? record.contentZhHans : selectLanguage === 'zh' ? record.contentZh : selectLanguage === 'ko' ? record.contentKr : record.contentEs}</p>
          </div>
        )
        return (
          <Popover content={content} >
            <Tag color="green" style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{selectLanguage === 'zhHans' ? record.titleZhHans : selectLanguage === 'zh' ? record.titleZh : selectLanguage === 'ko' ? record.titleKr : record.titleEs}</Tag>
          </Popover>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      render: (createdAt) => {
        return <span>{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss:SSS')}</span>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (updatedAt) => {
        return <span>{dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss:SSS')}</span>
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
      ellipsis: true,
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
      title: '分数',
      dataIndex: 'score',
      align: 'center',
      sorter: {
        compare: (a: API.NewsFlashInfoType, b: API.NewsFlashInfoType) => {
          return a.score - b.score
        },
        multiple: 1,
      },
      render: (score: number) => {
        return <span>{score}</span>
      }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record: any) => (
        <Space wrap>
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

  async function fetchData(page?: number) {
    if (tableLoading) return
    setTableLoading(true)
    postNewsFlashList({ pagination: { ...tableQuery, page: page || tableQuery.page }, startDate, endDate, title: searchValue }).then((res: any) => {
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

  function handleSearch() {
    setTableQuery({ ...tableQuery, page: 1 })
    fetchData(1)
  }

  function handleReset() {
    setTableQuery({ ...tableQuery, page: 1 })
    setStartDate(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))
    setEndDate(dayjs().format('YYYY-MM-DD'))
    setSearchValue('')
    fetchData(1)
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
                <Select.Option value="zhHans">简体中文</Select.Option>
                <Select.Option value="zh">繁体中文</Select.Option>
                <Select.Option value="ko">韩语</Select.Option>
                <Select.Option value="es">西班牙语</Select.Option>
              </Select>
            </Space>
          </Space>
          <Space size={10}>
            <Space>
              <h3>筛选日期：</h3>
              <RangePicker
                defaultValue={[dayjs(startDate), dayjs(endDate)]}
                value={[dayjs(startDate), dayjs(endDate)]}
                format='YYYY-MM-DD'
                onChange={(value) => {
                  if (value) {
                    setStartDate(value[0]?.format('YYYY-MM-DD') || '')
                    setEndDate(value[1]?.format('YYYY-MM-DD') || '')
                  }
                }}
                disabledDate={(current) => {
                  return current && current > dayjs().endOf('day')
                }}
              />
            </Space>
            <Space>
              <h3>搜索：</h3>
              <Input placeholder='请输入搜索内容' onChange={(e) => { setSearchValue(e.target.value) }} value={searchValue} />
              <Button type='primary' onClick={() => handleSearch()}>搜索&筛选</Button>
              <Button type='primary' danger onClick={() => handleReset()}>清除 搜索&筛选</Button>
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
          width='1000px'
          footer={null}
          closable={false}
          forceRender
        >
          <Form form={form} onFinish={handleConfirm}>
            <Form.Item label='快讯ID' name='id' hidden>
              <Input />
            </Form.Item>
            <Form.Item label='快讯标题(简体中文)' name='titleZhHans' rules={[{ required: true, message: '请输入快讯标题(简体中文)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(简体中文)' name='contentZhHans' rules={[{ required: true, message: '请输入快讯内容(简体中文)' }]}>
              <TextArea style={{ height: '200px' }} />
            </Form.Item>
            <Form.Item label='快讯标题(繁体中文)' name='titleZh' rules={[{ required: true, message: '请输入快讯标题(繁体中文)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(繁体中文)' name='contentZh' rules={[{ required: true, message: '请输入快讯内容(繁体中文)' }]}>
              <TextArea style={{ height: '200px' }} />
            </Form.Item>
            <Form.Item label='快讯标题(英文)' name='titleEn' rules={[{ required: true, message: '请输入快讯标题(英文)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(英文)' name='contentEn' rules={[{ required: true, message: '请输入快讯内容(英文)' }]}>
              <TextArea style={{ height: '200px' }} />
            </Form.Item>
            <Form.Item label='快讯标题(韩语)' name='titleKr' rules={[{ required: true, message: '请输入快讯标题(韩语)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(韩语)' name='contentKr' rules={[{ required: true, message: '请输入快讯内容(韩语)' }]}>
              <TextArea style={{ height: '200px' }} />
            </Form.Item>
            <Form.Item label='快讯标题(西班牙语)' name='titleEs' rules={[{ required: true, message: '请输入快讯标题(西班牙语)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(西班牙语)' name='contentEs' rules={[{ required: true, message: '请输入快讯内容(西班牙语)' }]}>
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
