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
  Input,
  Select,
  DatePicker,
  message
} from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { getInformationList, postChangeInformationStar, postChangeInformationStatus, postDeleteInformation, postInformationUpdate } from '@/api'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
const { RangePicker } = DatePicker;

const InformationList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.InformationInfoType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 15 })
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [searchTitle, setSearchTitle] = useState<string>('')
  const [selectLanguage, setSelectLanguage] = useState<string>('zh')
  const [selectDateEnd, setSelectDateEnd] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [selectDateStart, setSelectDateStart] = useState<string>(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))
  const columns: ColumnsType<API.InformationInfoType> = [
    {
      title: '新闻ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '资讯标题',
      dataIndex: 'titleZh',
      align: 'center',
      render: (_, record: any) => {
        const content = (
          <div style={{ width: '300px' }}>
            <p>资讯简介：<br />{selectLanguage === 'zhHans' ? record.descriptionZhHans : selectLanguage === 'zh' ? record.descriptionZh : selectLanguage === 'en' ? record.descriptionEn : selectLanguage === 'ko' ? record.descriptionKr : selectLanguage === 'es' ? record.descriptionEs : ''}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color="green" style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{selectLanguage === 'zhHans' ? record.titleZhHans : selectLanguage === 'zh' ? record.titleZh : selectLanguage === 'en' ? record.titleEn : selectLanguage === 'ko' ? record.titleKr : selectLanguage === 'es' ? record.titleEs : ''}</Tag>
          </Popover>
        )
      }
    },
    {
      title: '创建人',
      dataIndex: 'author',
      align: 'center',
      render: (author) => {
        return (
          <Tag color='blue'>{author}</Tag>
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
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (updatedAt) => {
        return <span>{dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '是否选为精选资讯',
      dataIndex: 'isStar',
      align: 'center',
      render: (isStar, record) => (
        <Switch checkedChildren="是" unCheckedChildren="否" checked={isStar} onClick={() => handleStarChange(isStar, record)} />
      )
    },
    {
      title: '新闻禁用状态',
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
          <Button type="dashed">
            <Link to={`/information/information-content/information-detail`} state={{ id: record.id }}>详情</Link>
          </Button>
          <Button type="primary">
            <Link to={`/information/information-content/information-edit`} state={{ id: record.id }}>修改</Link>
          </Button>
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
    if (tableQuery.page !== 0 && tableQuery.size !== 0) {
      fetchData()
    }
  }, [tableQuery.page, tableQuery.size])

  async function fetchData(page?: number) {
    if (tableLoading) return
    setTableLoading(true)
    getInformationList({
      pagination: { ...tableQuery, page: page || tableQuery.page },
      startDate: selectDateStart,
      endDate: selectDateEnd,
      title: searchTitle
    }).then((res: any) => {
      if (res.code !== 0) {
        return message.error(res.error)
      }
      const { articles, pagination: { total } } = res.data
      setTableData(articles)
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

  function handleDelete(id: number) {
    if (id) {
      Modal.confirm({
        title: '此操作将删除该数据, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '删除',
        cancelText: '取消',
        onOk() {
          postDeleteInformation({ ids: [id] }).then((res: any) => {
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
            postDeleteInformation({ ids: selectedRowKeys }).then((res: any) => {
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

  function handleSwitchChange(checked: boolean, record: API.InformationInfoType) {
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
  function handleStarChange(checked: boolean, record: API.InformationInfoType) {
    console.log(checked, record)
    if (!checked) {
      Modal.confirm({
        title: '此操作将选为精选资讯, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '选为精选资讯',
        cancelText: '取消',
        onOk() {
          return SwitchStar(true, record)
        },
        onCancel() {
        }
      })
    } else {
      Modal.confirm({
        title: '此操作将取消精选资讯, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '取消精选资讯',
        cancelText: '取消',
        onOk() {
          return SwitchStar(false, record)
        },
        onCancel() {
        }
      })
    }
  }

  const SwitchStar = async (status: boolean, record: API.InformationInfoType) => {
    return postChangeInformationStar({ id: record.id, isStar: status }).then((res: any) => {
      if (res.code === 0) {
        message.success('修改成功')
        setTableData(tableData.map((item: API.InformationInfoType) => item.id === record.id ? { ...item, isStar: status } : item))
      } else {
        message.error(res.msg || '修改失败')
      }
    }).catch((err: any) => {
      message.error(err.msg || '修改失败')
    })
  }

  const SwitchStatus = async (status: boolean, record: API.InformationInfoType) => {
    return postChangeInformationStatus({ id: record.id, option: status ? "activate" : "deactivate" }).then((res: any) => {
      if (res.code === 0) {
        message.success('修改成功')
        setTableData(tableData.map((item: API.InformationInfoType) => item.id === record.id ? { ...item, isActive: status } : item))
      } else {
        message.error(res.msg || '修改失败')
      }
    }).catch((err: any) => {
      message.error(err.msg || '修改失败')
    })
  }

  function handleSearch() {
    setTableQuery({ ...tableQuery, page: 1 })
    fetchData(1)
  }

  function handleReset() {
    setTableQuery({ ...tableQuery, page: 1 })
    setSelectDateStart(dayjs().subtract(1, 'day').format('YYYY-MM-DD'))
    setSelectDateEnd(dayjs().format('YYYY-MM-DD'))
    setSearchTitle('')
    fetchData(1)
  }

  return (
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Space>
            <Button type='primary'><PlusOutlined />
              <Link to={`/information/information-content/information-add`} state={{ id: "add" }}>新增资讯</Link>
            </Button>
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
                defaultValue={[dayjs(selectDateStart), dayjs(selectDateEnd)]}
                value={[dayjs(selectDateStart), dayjs(selectDateEnd)]}
                format='YYYY-MM-DD'
                onChange={(value) => {
                  if (value) {
                    setSelectDateStart(value[0]?.format('YYYY-MM-DD') || '')
                    setSelectDateEnd(value[1]?.format('YYYY-MM-DD') || '')
                  }
                }}
                disabledDate={(current) => {
                  return current && current > dayjs().endOf('day')
                }}
                onOk={(value) => {
                  console.log(value)
                }}
              />
            </Space>
            <Space>
              <h3>搜索：</h3>
              <Input value={searchTitle} onChange={(e) => { setSearchTitle(e.target.value) }} placeholder='请输入搜索内容' />
              <Button type='primary' onClick={() => { handleSearch() }}>筛选&搜索</Button>
              <Button type='primary' danger onClick={() => { handleReset() }}>清除 筛选&搜索</Button>
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
      </Card>
    </>
  )
}

export default InformationList


