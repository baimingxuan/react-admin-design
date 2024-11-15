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
import { getNewsFlashList } from '@/api'
import dayjs from 'dayjs'
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const NewsFlashList: FC = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.NewsFlashInfoType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ current: 1, pageSize: 15 })
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [selectLanguage, setSelectLanguage] = useState<string>('zh')
  const [selectLable, setSelectLable] = useState<string>('1')
  const [selectDate, setSelectDate] = useState<any>(null)
  const [searchValue, setSearchValue] = useState<string>('')

  const [form] = Form.useForm()
  const [modalVisibel, setModalVisibel] = useState<boolean>(false)

  const columns: ColumnsType<API.NewsFlashInfoType> = [
    {
      title: '快讯ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '快讯标题',
      dataIndex: 'news_flash_title_zh',
      align: 'center',
      render: (_, record: any) => {
        const content = (
          <div style={{ width: '300px' }}>
            <p>快讯内容：<br />{selectLanguage === 'zh' ? record.news_flash_content_zh : record.news_flash_content_en}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color="green">{selectLanguage === 'zh' ? record.news_flash_title_zh : record.news_flash_title_en}</Tag>
          </Popover>
        )
      }
    },
    {
      title: '快讯标签',
      dataIndex: 'news_flash_label',
      align: 'center',
      render: (news_flash_label, record) => {
        return news_flash_label?.map((label: API.NewsFlashLabelType) => {
          return <Tag color="orange" key={record.id + label.label_name}>{label.label_name}</Tag>
        })
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
      title: '快讯来源',
      dataIndex: 'news_flash_source_site',
      align: 'center',
      render: (news_flash_source_site) => {
        return <a href={news_flash_source_site.source_site_url} style={{ color: 'blue' }} target='_blank'>{news_flash_source_site.source_site_url}</a>
      }
    },
    {
      title: '原文地址',
      dataIndex: 'news_flash_source_url',
      align: 'center',
      render: (news_flash_source_url) => {
        return <a href={news_flash_source_url} style={{ color: 'blue' }} target='_blank'>{news_flash_source_url}</a>
      }
    },
    {
      title: '快讯状态',
      dataIndex: 'news_flash_status',
      align: 'center',
      render: (news_flash_status) => (
        <Switch defaultChecked={news_flash_status} onChange={checked => (news_flash_status = checked)} />
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
    const data = await getNewsFlashList(tableQuery)
    const { list, total } = data as unknown as API.APIResult
    setTableData(list)
    setTableTotal(total)
    setTableLoading(false)
  }

  function handlePageChange(page: number, pageSize: number) {
    setTableQuery({ ...tableQuery, current: page, pageSize })
  }

  function handleEdit(record: API.NewsFlashInfoType) {
    form.setFieldsValue({ ...record, news_flash_label: [...record.news_flash_label.map((item: API.NewsFlashLabelType) => item.id)] })
    setModalVisibel(true)
  }

  function handleConfirm(values: any) {
    console.log(values)
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
              <h3>选择标签：</h3>
              <Select value={selectLable} onChange={(value) => { setSelectLable(value) }}>
                <Select.Option value="1">标签1</Select.Option>
                <Select.Option value="2">标签2</Select.Option>
                <Select.Option value="3">标签3</Select.Option>
                <Select.Option value="4">标签4</Select.Option>
              </Select>
            </Space>
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
            <Form.Item label='快讯标题(中文)' name='news_flash_title_zh' rules={[{ required: true, message: '请输入快讯标题(中文)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(中文)' name='news_flash_content_zh' rules={[{ required: true, message: '请输入快讯内容(中文)' }]}>
              <TextArea style={{ height: '200px' }} />
            </Form.Item>
            <Form.Item label='快讯标题(英文)' name='news_flash_title_en' rules={[{ required: true, message: '请输入快讯标题(英文)' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='快讯内容(英文)' name='news_flash_content_en' rules={[{ required: true, message: '请输入快讯内容(英文)' }]}>
              <TextArea style={{ height: '200px' }} />
            </Form.Item>
            <Form.Item label='快讯标签' name='news_flash_label' rules={[{ required: true, message: '请选择快讯标签' }]}>
              <Select mode='multiple' placeholder='请选择新增快讯标签'>
                <Select.Option value={0}>News Flash Label 1</Select.Option>
                <Select.Option value={1}>News Flash Label 2</Select.Option>
                <Select.Option value={2}>News Flash Label 3</Select.Option>
                <Select.Option value={3}>News Flash Label 4</Select.Option>
                <Select.Option value={4}>News Flash Label 5</Select.Option>
                <Select.Option value={5}>News Flash Label 6</Select.Option>
                <Select.Option value={6}>News Flash Label 7</Select.Option>
                <Select.Option value={7}>News Flash Label 8</Select.Option>
                <Select.Option value={8}>News Flash Label 9</Select.Option>
                <Select.Option value={9}>News Flash Label 10</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 20, offset: 16 }}>
              <Button type='primary' htmlType="button">
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
