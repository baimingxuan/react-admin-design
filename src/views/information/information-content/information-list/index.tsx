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
import { getInformationList } from '@/api'
import dayjs from 'dayjs'
import { DefaultOptionType } from 'antd/es/select'
import { Link } from 'react-router-dom'

const InformationList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.InformationInfoType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ current: 1, pageSize: 15 })
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [selectValue, setSelectValue] = useState<string>('1')
  const [loadingSwitchId, setLoadingSwitchId] = useState<number>(0)
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
      dataIndex: 'information_title_zh',
      align: 'center',
      render: (_, record: any) => {
        const content = (
          <div style={{ width: '300px' }}>
            <p>资讯简介：<br />{selectLanguage === 'zh' ? record.information_introduction_zh : record.information_introduction_en}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color="green">{selectLanguage === 'zh' ? record.information_title_zh : record.information_title_en}</Tag>
          </Popover>
        )
      }
    },
    {
      title: '资讯专题',
      dataIndex: 'information_special_topic',
      align: 'center',
      render: (information_special_topic) => {
        const content = (
          <div style={{ width: '300px' }}>
            <p>专题简介：<br />{selectLanguage === 'zh' ? information_special_topic.special_topic_introduction_zh : information_special_topic.special_topic_introduction_en}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color="purple">{selectLanguage === 'zh' ? information_special_topic.special_topic_name_zh : information_special_topic.special_topic_name_en}</Tag>
          </Popover>
        )
      }
    },
    {
      title: '资讯标签',
      dataIndex: 'information_label',
      align: 'center',
      render: (information_label) => {
        return information_label.map((label: API.InformationLabelType, index: number) => <Tag key={index} color="orange">{label.label_name}</Tag>)
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
      title: '新闻禁用状态',
      dataIndex: 'information_status',
      align: 'center',
      render: (information_status, record) => (
        <Switch checkedChildren="上线中" unCheckedChildren="已禁用" loading={loadingSwitchId == record.id} checked={information_status} onClick={() => handleSwitchChange(information_status, record)} />
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
    if (tableQuery.current !== 0 && tableQuery.pageSize !== 0) {
      fetchData()
    }
  }, [tableQuery.current, tableQuery.pageSize])

  async function fetchData() {
    setTableLoading(true)
    const data = await getInformationList(tableQuery)
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
        title: '此操作将删除该数据, 是否继续?',
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
        message.error('请选择要删除的数据')
      } else {
        Modal.confirm({
          title: '此操作将删除选中数据, 是否继续?',
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

  function handleSwitchChange(checked: boolean, record: API.InformationInfoType) {
    setLoadingSwitchId(record.id)
    console.log(checked)
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
                <Select.Option value="zh">中文</Select.Option>
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
              <DatePicker /> - <DatePicker />
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
          open={loadingSwitchId !== 0}
          title='禁用资讯'
          width='400px'
          okText='禁用'
          cancelText='取消'
          onCancel={() => setLoadingSwitchId(0)}
          onOk={() => setLoadingSwitchId(0)}
        >
          资讯被禁用后线上将不再显示，推荐位也不会显示该资讯
        </Modal>
      </Card>
    </>
  )
}

export default InformationList


