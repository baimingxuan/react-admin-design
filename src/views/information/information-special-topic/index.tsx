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
  Select,
  Popover,
  Upload,
  UploadFile,
  UploadProps
} from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { getInformationSpecialTopicList } from '@/api'
import dayjs from 'dayjs'
import TextArea from 'antd/es/input/TextArea'
import { UPLOAD_IMG_SRC } from '@/settings/websiteSetting'

const InformationSpecialTopicList: FC = () => {
  const [form] = Form.useForm()
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.InformationSpecialTopicType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ current: 1, pageSize: 10 })
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])
  const [selectLanguage, setSelectLanguage] = useState<string>('zh')
  const [showAddTable, setShowAddTable] = useState<boolean>(false)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

  const [listImgs, setListImgs] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'beautiful-girl.jpg',
      status: 'done',
      url: UPLOAD_IMG_SRC,
      thumbUrl: UPLOAD_IMG_SRC
    }
  ])

  const columns: ColumnsType<API.InformationSpecialTopicType> = [
    {
      title: '专题ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '专题名称',
      dataIndex: 'special_topic_name_zh',
      align: 'center',
      render: (special_topic_name_zh, record) => {
        const content = (
          <div style={{ width: '300px' }}>
            <p>专题简介：<br />{selectLanguage === 'zh' ? record.special_topic_introduction_zh : record.special_topic_introduction_en}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color="purple">{selectLanguage === 'zh' ? special_topic_name_zh : record.special_topic_name_en}</Tag>
          </Popover>
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
      dataIndex: 'update_time',
      align: 'center',
      render: (update_time) => {
        return <span>{dayjs(update_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '专题封面',
      dataIndex: 'special_topic_background_img',
      align: 'center',
      render: (special_topic_background_img) => {
        return <img src={special_topic_background_img} alt='专题封面' style={{ width: '100px', height: 'auto' }} />
      }
    },
    {
      title: '专题禁用状态',
      dataIndex: 'special_topic_status',
      align: 'center',
      render: (special_topic_status, record) => (
        <Switch checkedChildren="上线中" unCheckedChildren="已禁用" checked={special_topic_status} onClick={() => handleSwitchStatus(special_topic_status, record)} />
      )
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record: API.InformationSpecialTopicType) => (
        <Space>
          <Button type="primary" onClick={() => { handleEdit(record.id) }}>
            修改
          </Button>
          <Button type="dashed" danger onClick={() => { handleDelete([record.id]) }}>
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
    const data = await getInformationSpecialTopicList(tableQuery)
    const { list, total } = data as unknown as API.APIResult
    setTableData(list)
    setTableTotal(total)
    setTableLoading(false)
  }

  function handlePageChange(page: number, pageSize: number) {
    setTableQuery({ ...tableQuery, current: page, pageSize })
  }

  function handleDelete(ids: number[]) {
    if (ids.length > 0) {
      Modal.confirm({
        title: '此操作将删除该专题, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '删除',
        cancelText: '取消',
        onOk() {
          return deleteSpecialTopic(ids)
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    } else {
      if (selectedRowKeys.length === 0) {
        message.error('请选择要删除的专题')
      } else {
        Modal.confirm({
          title: '此操作将删除选中专题, 是否继续?',
          icon: <ExclamationCircleOutlined rev={undefined} />,
          okType: 'danger',
          okText: '删除',
          cancelText: '取消',
          onOk() {
            return deleteSpecialTopic(selectedRowKeys)
          },
          onCancel() {
            console.log('Cancel')
          }
        })
      }
    }
  }

  async function deleteSpecialTopic(ids: number[]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      }, 1000);
    })
  }

  function handleEdit(id: number) {
    let item = tableData.find((item) => item.id === id)
    form.setFieldsValue({ ...item })
    setListImgs([{
      uid: '-1',
      name: 'beautiful-girl.jpg',
      status: 'done',
      url: item?.special_topic_background_img,
      thumbUrl: item?.special_topic_background_img
    }])
    setShowAddTable(true)
  }

  function addInformationSpecialTopic() {
    setShowAddTable(true)
    form.resetFields()
    form.setFieldsValue({})
    setListImgs([{
      uid: '-1',
      name: 'beautiful-girl.jpg',
      status: 'done',
      url: UPLOAD_IMG_SRC,
      thumbUrl: UPLOAD_IMG_SRC
    }])
  }

  function handleSwitchStatus(checked: boolean, record: API.InformationSpecialTopicType) {
    if (checked) {
      Modal.confirm({
        title: '此操作将禁用专题, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '禁用',
        cancelText: '取消',
        onOk() {
          return switchStatus(!checked, record)
        },
        onCancel() {
        }
      })
    } else {
      Modal.confirm({
        title: '此操作将启用专题, 是否继续?',
        icon: <ExclamationCircleOutlined rev={undefined} />,
        okType: 'danger',
        okText: '启用',
        cancelText: '取消',
        onOk() {
          return switchStatus(!checked, record)
        },
        onCancel() {
        }
      })
    }
  }

  async function switchStatus(checked: boolean, record: API.InformationSpecialTopicType) {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(true) }, 1000)
    }).then(() => {
      message.success('操作成功')
      setTableData(tableData.map((item) => {
        if (item.id === record.id) {
          return { ...item, special_topic_status: checked }
        }
        return item
      }))
    }).catch(() => {
      message.error('操作失败')
    })
  }

  const onFinish = (values: any) => {
    setLoadingEdit(true)
    if (values.create_user) {
      editOnFinish(values)
    } else {
      addOnFinish(values)
    }
  }

  const editOnFinish = async (values: any) => {
    setTimeout(() => {
      setLoadingEdit(false)
      setShowAddTable(false)
    }, 1000);
  }

  const addOnFinish = async (values: any) => {
    setTimeout(() => {
      setLoadingEdit(false)
      setShowAddTable(false)
    }, 1000);
  }

  const updateListImgs: UploadProps['onChange'] = ({ fileList: newFileList }) => setListImgs(newFileList)

  return (
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Space>
            <Button type='primary' onClick={() => { addInformationSpecialTopic() }}><PlusOutlined />新增专题</Button>
            <Button type='primary' danger onClick={() => { handleDelete([]) }}><DeleteOutlined />批量删除</Button>
            <Space>
              <h3>选择语言:</h3>
              <Select value={selectLanguage} onChange={(value) => { setSelectLanguage(value) }}>
                <Select.Option value="en">英文</Select.Option>
                <Select.Option value="zh">中文</Select.Option>
              </Select>
            </Space>
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
          open={showAddTable}
          title={form.getFieldValue('create_user') ? '修改专题' : '新增专题'}
          closable={false}
          footer={null}
          width='1000px'
          forceRender
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题名称(中文)</h4>} name='special_topic_name_zh' rules={[{ required: true, message: '请输入专题名称' }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题名称(英文)</h4>} name='special_topic_name_en' rules={[{ required: true, message: '请输入专题名称' }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题简介(中文)</h4>} name='special_topic_introduction_zh' rules={[{ required: true, message: '请输入专题简介' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题简介(英文)</h4>} name='special_topic_introduction_en' rules={[{ required: true, message: '请输入专题简介' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题封面</h4>} name='special_topic_background_img' rules={[{ required: true, message: '请上传专题封面' }]}>
              <Card title='' bordered={false} styles={{ body: { height: '150px' } }}>
                <Upload
                  fileList={listImgs}
                  action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  accept='.jpg, .jpeg, .gif, .png, .bmp'
                  listType='picture-card'
                  className='list-upload'
                  style={{ height: '100px', width: 'auto' }}
                  onChange={updateListImgs}
                  maxCount={1}
                >
                  {listImgs.length === 0 && (
                    <div>
                      <PlusOutlined rev={undefined} />
                      <div style={{ marginTop: '8px' }}>点击上传</div>
                    </div>
                  )}
                </Upload>
              </Card>
            </Form.Item>
            {
              form.getFieldValue('create_user') ? <>
                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题禁用状态</h4>} name='special_topic_status' rules={[{ required: true, message: '请选择专题禁用状态' }]}>
                  <Select>
                    <Select.Option value={true}>上线中</Select.Option>
                    <Select.Option value={false}>已禁用</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>创建人</h4>} name='create_user' hidden>
                  <Input />
                </Form.Item>
              </> : null
            }

            <Form.Item wrapperCol={{ span: 12, offset: 14 }}>
              <Button type='primary' htmlType='submit' loading={loadingEdit}>
                确认
              </Button>
              <Button style={{ marginLeft: '12px' }} onClick={() => { setShowAddTable(false); }}>
                取消
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </>
  )
}

export default InformationSpecialTopicList


