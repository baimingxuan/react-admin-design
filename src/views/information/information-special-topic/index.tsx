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
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { getInformationSpecialTopicList, getSearchInformationSpecialTopic, postAddInformationSpecialTopic, postUpdateInformationSpecialTopic, uploadImage } from '@/api'
import dayjs from 'dayjs'
import TextArea from 'antd/es/input/TextArea'
import { uploadImgToBase64 } from '@/utils/image'

const InformationSpecialTopicList: FC = () => {
  const [form] = Form.useForm()
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.InformationSpecialTopicType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 10 })
  const [selectLanguage, setSelectLanguage] = useState<string>('zh')
  const [showAddTable, setShowAddTable] = useState<boolean>(false)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)
  const [searchValues, setSearchValues] = useState<string>("")

  const [listImgs, setListImgs] = useState<UploadFile[]>([])

  const columns: ColumnsType<API.InformationSpecialTopicType> = [
    {
      title: '专题ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '专题名称',
      dataIndex: 'nameZh',
      align: 'center',
      render: (nameZh, record) => {
        const content = (
          <div style={{ width: '300px' }}>
            <p>专题简介：<br />{selectLanguage === 'zh' ? record.descriptionZh : selectLanguage === 'en' ? record.descriptionEn : selectLanguage === 'ko' ? record.descriptionKr : selectLanguage === 'es' ? record.descriptionEs : ''}</p>
          </div>
        )
        return (
          <Popover content={content}>
            <Tag color="purple">{selectLanguage === 'zh' ? nameZh : selectLanguage === 'en' ? record.nameEn : selectLanguage === 'ko' ? record.nameKr : selectLanguage === 'es' ? record.nameEs : ''}</Tag>
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
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (updateAt) => {
        return <span>{dayjs(updateAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      }
    },
    {
      title: '专题封面',
      dataIndex: 'backgroundImageUrl',
      align: 'center',
      render: (backgroundImageUrl) => {
        return <img src={backgroundImageUrl} alt='专题封面' style={{ width: '100px', height: 'auto' }} />
      }
    },
    {
      title: '专题禁用状态',
      dataIndex: 'isActive',
      align: 'center',
      render: (isActive, record) => (
        <Switch checkedChildren="上线中" unCheckedChildren="已禁用" checked={isActive} onClick={() => handleSwitchStatus(isActive, record)} />
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
        </Space>
      )
    }
  ]

  useEffect(() => {
    if (tableQuery.page !== 0 && tableQuery.size !== 0) {
      fetchData()
    }
  }, [tableQuery.page, tableQuery.size])

  async function fetchData(values?: string) {
    setTableLoading(true)
    if (values) {
      getSearchInformationSpecialTopic({ query: values }).then((res: any) => {
        if (res.code !== 0) {
          return message.error("获取数据失败,错误码:" + res.code)
        }
        setTableData(res.data.data)
        setTableTotal(res.data.data.length)
      }).catch(() => {
        message.error('获取专题列表失败')
      }).finally(() => {
        setTableLoading(false)
      })
    } else {
      getInformationSpecialTopicList(tableQuery).then((res: any) => {
        if (res.code !== 0) {
          return message.error("获取数据失败,错误码:" + res.code)
        }
        const { data, total } = res.data
        setTableData(data)
        setTableTotal(total)
      }).catch(() => {
        message.error('获取专题列表失败')
      }).finally(() => {
        setTableLoading(false)
      })
    }
  }

  function handlePageChange(page: number, size: number) {
    setTableQuery({ ...tableQuery, page, size })
  }




  function handleEdit(id: number) {
    let item = tableData.find((item) => item.id === id)
    form.setFieldsValue({ ...item })
    if (item?.backgroundImageUrl) {
      setListImgs([{
        uid: '-1',
        name: 'beautiful-girl.jpg',
        status: 'done',
        url: item?.backgroundImageUrl,
        thumbUrl: item?.backgroundImageUrl
      }])
    } else {
      setListImgs([])
    }
    setShowAddTable(true)
  }

  function addInformationSpecialTopic() {
    setShowAddTable(true)
    form.resetFields()
    form.setFieldsValue({})
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
    postUpdateInformationSpecialTopic({ ...record, isActive: checked }).then((res: any) => {
      if (res.code !== 0) {
        return message.error("修改专题状态失败,错误码:" + res.code)
      }
      message.success('修改专题状态成功')
      setTableData(tableData.map((item) => {
        if (item.id === record.id) {
          return { ...item, isActive: checked }
        }
        return item
      }))
    }).catch(() => {
      message.error('修改专题状态失败')
    })
  }

  const onFinish = (values: any) => {
    setLoadingEdit(true)
    if (values.createdAt) {
      delete values.createdAt
      editOnFinish(values)
    } else {
      addOnFinish(values)
    }
  }

  const editOnFinish = async (values: any) => {
    setLoadingEdit(true)
    postUpdateInformationSpecialTopic({ ...values }).then((res: any) => {
      if (res.code !== 0) {
        return message.error("修改专题失败,错误码:" + res.code)
      }
      message.success('修改专题成功')
      fetchData()
      setShowAddTable(false)
    }).catch(() => {
      message.error('修改专题失败')
    }).finally(() => {
      setLoadingEdit(false)
    })
  }

  const addOnFinish = async (values: any) => {
    setLoadingEdit(true)
    postAddInformationSpecialTopic({ ...values }).then((res: any) => {
      if (res.code !== 0) {
        return message.error("新增专题失败,错误码:" + res.code)
      }
      message.success('新增专题成功')
      fetchData()
      setShowAddTable(false)
    }).catch(() => {
      message.error('新增专题失败')
    }).finally(() => {
      setLoadingEdit(false)
    })
  }

  const handleChangeListImgs: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setListImgs(newFileList)
    form.setFieldValue("backgroundImageUrl", newFileList[0]?.response?.data?.url || "")
  }

  const customUploadListImgs: UploadProps['customRequest'] = async (e) => {
    // 将图片转换为base64
    const base64 = await uploadImgToBase64(e.file as File) as { result: string }
    uploadImage({ image: base64.result.replace(/.*;base64,/, '') }).then((res) => {
      console.log(res)
      if (res.code !== 0) {
        e.onError?.({
          status: res.code,
          message: '上传失败',
          name: ""
        })
        return message.error("上传图片失败,错误码:" + res.code)
      }
      console.log(res.data.imageUrl)
      e.onSuccess?.({
        data: {
          url: res.data.imageUrl + "/wideThumbnail",
          name: '',
          status: "done",
          thumbUrl: res.data.imageUrl + "/wideThumbnail"
        }
      });
      form.setFieldValue("backgroundImageUrl", res.data.imageUrl + "/wideThumbnail")
    }).catch((err) => {
      message.error('上传失败')
      e.onError?.({
        status: 500,
        message: '上传失败',
        name: 'baidu.png'
      })
    });
  }
  return (
    <>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Space>
            <Button type='primary' onClick={() => { addInformationSpecialTopic() }}><PlusOutlined />新增专题</Button>
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
          <Space>
            <h3>搜索：</h3>
            <Input placeholder='请输入搜索内容' onChange={(e) => { setSearchValues(e.target.value) }} />
            <Button type='primary' onClick={() => { fetchData(searchValues) }}>搜索</Button>
            <Button type='primary' danger onClick={() => { setSearchValues('') }}>重置</Button>
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
          title={form.getFieldValue('createdAt') ? '修改专题' : '新增专题'}
          closable={false}
          footer={null}
          width='1000px'
          forceRender
        >
          <Form form={form}
            colon={false}
            labelCol={{ span: 4 }}
            labelAlign='left'
            style={{ width: '100%', margin: '0 auto' }}
            onFinish={onFinish}>
            {
              form.getFieldValue('createdAt') ? <>
                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>创建时间</h4>} name='createdAt' hidden>
                  <Input />
                </Form.Item>
                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>ID</h4>} name='id'>
                  <Input disabled />
                </Form.Item>
                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题禁用状态</h4>} name='isActive' rules={[{ required: true, message: '请选择专题禁用状态' }]}>
                  <Select>
                    <Select.Option value={true}>上线中</Select.Option>
                    <Select.Option value={false}>已禁用</Select.Option>
                  </Select>
                </Form.Item>
              </> : null
            }
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题名称(繁体中文)</h4>} name='nameZh' rules={[{ required: true, message: '请输入专题名称' }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题名称(英文)</h4>} name='nameEn' rules={[{ required: true, message: '请输入专题名称' }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题名称(韩语)</h4>} name='nameKr' rules={[{ required: true, message: '请输入专题名称' }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题名称(西班牙语)</h4>} name='nameEs' rules={[{ required: true, message: '请输入专题名称' }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题简介(繁体中文)</h4>} name='descriptionZh' rules={[{ required: true, message: '请输入专题简介' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题简介(英文)</h4>} name='descriptionEn' rules={[{ required: true, message: '请输入专题简介' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题简介(韩语)</h4>} name='descriptionKr' rules={[{ required: true, message: '请输入专题简介' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题简介(西班牙语)</h4>} name='descriptionEs' rules={[{ required: true, message: '请输入专题简介' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>专题封面</h4>} name='backgroundImageUrl' rules={[{ required: true, message: '请上传专题封面' }]}>
              <Card title='' bordered={false} bodyStyle={{ height: '150px' }}>
                <Upload
                  fileList={listImgs}
                  accept='.jpg, .jpeg, .gif, .png, .bmp, .svg'
                  listType='picture-card'
                  style={{ height: '100px', width: 'auto' }}
                  onChange={handleChangeListImgs}
                  maxCount={1}
                  customRequest={customUploadListImgs}
                >
                  {listImgs.length === 0 && (
                    <div>
                      <PlusOutlined rev={undefined} />
                      <div style={{ marginTop: '8px' }}>点击上传（建议尺寸: W:278px H:157px）</div>
                    </div>
                  )}
                </Upload>
              </Card>
            </Form.Item>
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

