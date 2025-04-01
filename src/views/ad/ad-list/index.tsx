import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import {
  Card,
  Button,
  Table,
  Switch,
  Space,
  Modal,
  Input,
  message,
  Form,
  Select,
  Upload,
  UploadFile,
  UploadProps
} from 'antd'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { getAdList, postCreateAd, postUpdateAd, uploadImage } from '@/api'
import dayjs from 'dayjs'
import { uploadImgToBase64 } from '@/utils/image'

const AdList: FC = () => {
  const [form] = Form.useForm()
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<API.AdType[]>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 10 })
  const [selectLanguage, setSelectLanguage] = useState<string>('')
  const [showAddTable, setShowAddTable] = useState<boolean>(false)
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false)
  const [listImgs, setListImgs] = useState<UploadFile[]>([])

  const columns: ColumnsType<API.AdType> = [
    {
      title: '广告ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true
    },
    {
      title: '广告标题',
      dataIndex: 'title',
      align: 'center',
      render: (title) => {
        return <span>{title}</span>
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
      title: '广告图片',
      dataIndex: 'imageUrl',
      align: 'center',
      render: (imageUrl) => {
        return <img src={imageUrl} alt='广告图片' style={{ width: '100px', height: 'auto' }} />
      }
    },
    {
      title: '广告状态',
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
      render: (_, record: API.AdType) => (
        <Space>
          <Button type="primary" onClick={() => { handleEdit(record.id) }}>
            修改
          </Button>
        </Space>
      )
    }
  ]

  useEffect(() => {
    if (tableQuery.page !== 0 && tableQuery.size !== 0 && tableQuery.page !== 1) {
      fetchData()
    }
  }, [tableQuery.page, tableQuery.size])

  useEffect(() => {
    setTableQuery({ ...tableQuery, page: 1 })
    fetchData(1)
  }, [selectLanguage])

  async function fetchData(page?: number) {
    if (tableLoading) return
    setTableLoading(true)
    if (page) {
      getAdList({ ...tableQuery, page: page || tableQuery.page, language: selectLanguage }).then((res: any) => {
        if (res.code !== 0) {
          return message.error("获取数据失败,错误码:" + res.code)
        }
        setTableData(res.data.Advertises)
        setTableTotal(res.data.total)
      }).catch(() => {
        message.error('获取广告列表失败')
      }).finally(() => {
        setTableLoading(false)
      })
    } else {
      getAdList(tableQuery).then((res: any) => {
        if (res.code !== 0) {
          return message.error("获取数据失败,错误码:" + res.code)
        }
        const { Advertises, total } = res.data
        setTableData(Advertises)
        setTableTotal(total)
      }).catch(() => {
        message.error('获取广告列表失败')
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
    if (item?.imageUrl) {
      setListImgs([{
        uid: '-1',
        name: 'beautiful-girl.jpg',
        status: 'done',
        url: item?.imageUrl,
        thumbUrl: item?.imageUrl
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

  function handleSwitchStatus(checked: boolean, record: API.AdType) {
    if (checked) {
      Modal.confirm({
        title: '此操作将禁用广告, 是否继续?',
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
        title: '此操作将启用广告, 是否继续?',
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

  async function switchStatus(checked: boolean, record: API.AdType) {
    postUpdateAd({ ...record, isActive: checked }).then((res: any) => {
      if (res.code !== 0) {
        return message.error("修改广告状态失败,错误码:" + res.code)
      }
      message.success('修改广告状态成功')
      setTableData(tableData.map((item) => {
        if (item.id === record.id) {
          return { ...item, isActive: checked }
        }
        return item
      }))
    }).catch(() => {
      message.error('修改广告状态失败')
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
    postUpdateAd({ ...values }).then((res: any) => {
      if (res.code !== 0) {
        return message.error("修改广告失败,错误码:" + res.code)
      }
      message.success('修改广告成功')
      fetchData()
      setShowAddTable(false)
    }).catch(() => {
      message.error('修改广告失败')
    }).finally(() => {
      setLoadingEdit(false)
    })
  }

  const addOnFinish = async (values: any) => {
    setLoadingEdit(true)
    postCreateAd({ ...values }).then((res: any) => {
      if (res.code !== 0) {
        return message.error("新增广告失败,错误码:" + res.code)
      }
      message.success('新增广告成功')
      fetchData()
      setShowAddTable(false)
    }).catch(() => {
      message.error('新增广告失败')
    }).finally(() => {
      setLoadingEdit(false)
    })
  }

  const handleChangeListImgs: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setListImgs(newFileList)
    form.setFieldValue("imageUrl", newFileList[0]?.response?.data?.url || "")
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
      form.setFieldValue("imageUrl", res.data.imageUrl + "/wideThumbnail")
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
            <Button type='primary' onClick={() => { addInformationSpecialTopic() }}><PlusOutlined />新增广告</Button>
            <Space>
              <h3>选择语言:</h3>
              <Select value={selectLanguage} onChange={(value) => { setSelectLanguage(value) }}>
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="zh_hans">简体中文</Select.Option>
                <Select.Option value="en">英文</Select.Option>
                <Select.Option value="zh">繁体中文</Select.Option>
                <Select.Option value="kr">韩语</Select.Option>
                <Select.Option value="es">西班牙语</Select.Option>
              </Select>
            </Space>
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
          title={form.getFieldValue('createdAt') ? '修改广告' : '新增广告'}
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
                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>广告状态</h4>} name='isActive' rules={[{ required: true, message: '请选择广告状态' }]}>
                  <Select>
                    <Select.Option value={true}>上线中</Select.Option>
                    <Select.Option value={false}>已禁用</Select.Option>
                  </Select>
                </Form.Item>
              </> : null
            }
            {/* 广告语言 */}
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>广告语言</h4>} name='language' rules={[{ required: true, message: '请选择广告语言' }]}>
              <Select>
                <Select.Option value="en">英文</Select.Option>
                <Select.Option value="zh_hans">简体中文</Select.Option>
                <Select.Option value="zh">繁体中文</Select.Option>
                <Select.Option value="ko">韩语</Select.Option>
                <Select.Option value="es">西班牙语</Select.Option>
              </Select>
            </Form.Item>
            {/* 广告标题 */}
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>广告标题</h4>} name='title' rules={[{ required: true, message: '请输入广告标题' }]}>
              <Input />
            </Form.Item>
            {/* 广告图片 */}
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>广告图片</h4>} name='imageUrl' rules={[{ required: true, message: '请上传广告图片' }]}>
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
                      <div style={{ marginTop: '8px' }}>点击上传（建议尺寸: W:263px H:165px）</div>
                    </div>
                  )}
                </Upload>
              </Card>
            </Form.Item>
            {/* 广告链接 */}
            <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>广告链接</h4>} name='url' rules={[{ required: true, message: '请输入广告链接' }]}>
              <Input />
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

export default AdList

