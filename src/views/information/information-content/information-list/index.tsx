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
import { getInformationList, postChangeInformationStatus, postDeleteInformation } from '@/api'
import dayjs from 'dayjs'
import { DefaultOptionType } from 'antd/es/select'
import { Link } from 'react-router-dom'
const { RangePicker } = DatePicker;

const InformationList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.InformationInfoType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 15 })
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [selectValue, setSelectValue] = useState<string>('1')
  const [selectLanguage, setSelectLanguage] = useState<string>('zh')
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
            <p>资讯简介：<br />{selectLanguage === 'zh' ? record.descriptionZh : selectLanguage === 'en' ? record.descriptionEn : selectLanguage === 'ko' ? record.descriptionKr : selectLanguage === 'es' ? record.descriptionEs : ''}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color="green" style={{ maxWidth: '300px', whiteSpace: 'normal' }}>{selectLanguage === 'zh' ? record.titleZh : selectLanguage === 'en' ? record.titleEn : selectLanguage === 'ko' ? record.titleKr : selectLanguage === 'es' ? record.titleEs : ''}</Tag>
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

  async function fetchData() {
    setTableLoading(true)
    getInformationList({ pagination: tableQuery }).then((res: any) => {
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

  // select change
  function handleSelectChange(value: any, option: DefaultOptionType | DefaultOptionType[]): void {
    setSelectValue(value)
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
                <Select.Option value="zh">繁体中文</Select.Option>
                <Select.Option value="ko">韩语</Select.Option>
                <Select.Option value="es">西班牙语</Select.Option>
              </Select>
            </Space>
          </Space>
          <Space size={50}>
            <Space>
              <h3>选择标签：</h3>
              <Select value={selectValue} onChange={handleSelectChange}>
                <Select.Option value="1">标签1</Select.Option>
                <Select.Option value="2">标签2</Select.Option>
                <Select.Option value="3">标签3</Select.Option>
                <Select.Option value="4">标签4</Select.Option>
              </Select>
            </Space>
            <Space>
              <h3>筛选日期：</h3>
              <RangePicker onChange={(value) => { console.log(value) }} />
              <Button type='primary'>筛选</Button>
            </Space>
            <Space>
              <h3>搜索：</h3>
              <Input placeholder='请输入搜索内容' />
              <Button type='primary'>搜索</Button>
              <Button type='primary' danger>重置</Button>
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


