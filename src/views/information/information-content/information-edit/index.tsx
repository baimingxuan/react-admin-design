import { type FC, useEffect, useState } from 'react'
import { useLocation, useLoaderData } from 'react-router-dom'

import type { Rule } from 'antd/es/form'
import {
  Button,
  Card,
  Spin,
  Input,
  Form,
  Upload,
  UploadProps,
  UploadFile,
  message,
  Select,
  Divider,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import router from '@/router'
import { postInformationDetailById, postAddInformation, postInformationUpdate, getSearchInformationLabel, getSearchInformationSpecialTopic, uploadImage } from '@/api'
import RichTextEditor from './components/RichText'

import { useAppSelector } from '@/stores'
const InformationEdit: FC = () => {
  let id = useLocation()?.state?.id
  if (id === undefined) {
    id = (useLoaderData() as { id: any }).id
  }
  const [informationDetail, setInformationDetail] = useState<API.InformationInfoType | null>({
    id: 0,
    createdAt: '',
    updatedAt: '',
    author: '',
    titleZh: '',
    titleEn: '',
    contentZh: '',
    contentEn: '',
    descriptionZh: '',
    descriptionEn: '',
    tagIds: [],
    collectionIds: [],
    isActive: false,
    coverImageUrl: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [searchId, setSearchId] = useState<string>('')
  const [form] = Form.useForm()
  const [listImgs, setListImgs] = useState<UploadFile[]>([])
  const [htmlEn, setHtmlEn] = useState('')
  const [htmlZh, setHtmlZh] = useState('')

  const [selectSpecialTopicEnList, setSelectSpecialTopicEnList] = useState<{ value: number, label: string }[]>([])
  const [selectSpecialTopicZhList, setSelectSpecialTopicZhList] = useState<{ value: number, label: string }[]>([])
  const [selectLabelList, setSelectLabelList] = useState<{ value: number, label: string }[]>([])
  const { userInfo } = useAppSelector(state => state.user)

  useEffect(() => {
    // 获取所有专题
    getSearchInformationSpecialTopic({}).then((res: API.InformationSpecialTopicListResult) => {
      setSelectSpecialTopicEnList(res.data?.data?.map((item: any) => ({ value: item.id, label: item.nameEn, disabled: false })))
      setSelectSpecialTopicZhList(res.data?.data?.map((item: any) => ({ value: item.id, label: item.nameZh, disabled: false })))
    })
    // 获取所有标签
    getSearchInformationLabel({}).then((res: API.InformationLabelListResult) => {
      setSelectLabelList(res.data?.data?.map((item: any) => ({ value: item.id, label: item.name, disabled: false })))
    })
  }, [])

  const formRules: Record<string, Rule[]> = {
    all: [
      { required: true, message: '内容不能为空' }
    ],
  }
  const onFinish = (values: any) => {
    if (values.id === 0) {
      delete values.id
      postAddInformation({ ...values, contentEn: htmlEn, contentZh: htmlZh, author: userInfo?.username }).then((res: any) => {
        if (res.code === 0) {
          message.success('资讯添加成功')
          // 跳转到对应页面
          router.navigate("/information/information-content/information-detail", { state: { id: res.data.id } })
        } else {
          message.error(res.msg || '资讯添加失败')
        }
      }).catch((err: any) => {
        message.error(err.msg || '资讯添加失败')
      })
    } else {
      // update
      postInformationUpdate({ ...values, contentEn: htmlEn, contentZh: htmlZh }).then((res: any) => {
        if (res.code === 0) {
          message.success('资讯修改成功')
          // 跳转到对应页面
          router.navigate("/information/information-content/information-detail", { state: { id: res.data.id } })
        } else {
          message.error(res.msg || '资讯修改失败')
        }
      }).catch((err: any) => {
        message.error(err.msg || '资讯修改失败')
      })
    }
  }
  const resetForm = () => {
    form.resetFields()
  }
  useEffect(() => {
    if (id && id !== 'add') {
      setSearchId(id)
    }
  }, [id])

  useEffect(() => {
    if (searchId) {
      setLoading(true)
      postInformationDetailById({ id: Number(searchId) }).then((res: API.InformationDetailResult) => {
        setInformationDetail({
          ...res.data.article,
          tagIds: res.data?.tags?.map((item: any) => item.id) || [],
          collectionIds: res.data?.collections?.map((item: any) => item.id) || []
        })
        if (res.data.article.coverImageUrl) {
          setListImgs([{
            uid: '-1',
            name: res.data.article.coverImageUrl,
            status: 'done',
            url: res.data.article.coverImageUrl,
            thumbUrl: res.data.article.coverImageUrl
          }])
        } else {
          setListImgs([])
        }
        setHtmlEn(res.data.article.contentEn)
        setHtmlZh(res.data.article.contentZh)
        setLoading(false)
      })
    }
  }, [searchId])

  useEffect(() => {
    if (informationDetail?.contentEn === htmlEn && informationDetail?.contentZh === htmlZh) {
      resetForm()
    }
  }, [informationDetail])

  const handleChangeListImgs: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setListImgs(newFileList)
    form.setFieldValue("coverImageUrl", newFileList[0]?.response?.data?.url || "")
  }

  const customUploadListImgs: UploadProps['customRequest'] = (e) => {
    uploadImage({ file: e.file }).then((res) => {
      console.log('上传成功', res.data);
      e.onSuccess?.(res.data);
    }).catch((err) => {
      console.log('上传失败', err)
      e.onSuccess?.({
        data: {
          url: "https://www.baidu.com/img/bd_logo1.png",
          name: "baidu.png",
          status: "done",
          thumbUrl: "https://www.baidu.com/img/bd_logo1.png"
        }
      });
    });
  }

  return (
    <>
      {loading && <Spin spinning={loading} tip="加载中..." />}
      {!searchId && id !== 'add' && <Input.Search style={{ width: '300px' }} placeholder="请输入资讯编号" onSearch={(value) => { setSearchId(value) }} />}
      {!loading && (searchId || id === 'add') && (
        <Card bordered={false}>
          <div style={{ overflowX: 'scroll' }}>
            <Form
              form={form}
              labelCol={{ span: 4 }}
              initialValues={{ ...informationDetail }}
              onFinish={onFinish}
              style={{ width: '1200px', margin: '0 auto' }}
            >
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯编号</h3>} name='id' rules={formRules.all}>
                <Input disabled placeholder='请输入内容' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>创建人</h3>} name="author">
                <Input disabled placeholder='请输入内容' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯状态</h3>} name='isActive' rules={formRules.all}>
                <Select options={[{ label: '启用', value: true }, { label: '禁用', value: false }]} />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(中文)</h3>} name='titleZh' rules={formRules.all}>
                <Input style={{ width: '100%' }} placeholder='请输入中文标题' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(英文)</h3>} name='titleEn' rules={formRules.all}>
                <Input style={{ width: '100%' }} placeholder='请输入英文标题' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(中文)</h3>} name='descriptionZh' rules={formRules.all}>
                <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入中文简介' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(英文)</h3>} name='descriptionEn' rules={formRules.all}>
                <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入英文简介' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标签</h3>} name='tagIds' rules={formRules.all}>
                <Select mode='multiple' placeholder='请选择新增资讯标签' options={selectLabelList} optionFilterProp='label' value={informationDetail?.tagIds}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Button type='link' onClick={() => {
                        router.navigate('/information/information-label')
                      }}>新增资讯标签</Button>
                    </>
                  )}
                />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯专题(中文)</h3>} name='collectionIds' rules={formRules.all}>
                <Select mode='multiple' placeholder='请选择新增资讯专题' options={selectSpecialTopicZhList} optionFilterProp='label' value={informationDetail?.collectionIds}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Button type='link' onClick={() => {
                        router.navigate('/information/information-special-topic')
                      }}>新增资讯专题</Button>
                    </>
                  )}
                />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯专题(英文)</h3>} name='collectionIds' rules={formRules.all}>
                <Select mode='multiple' placeholder='请选择新增资讯专题' options={selectSpecialTopicEnList} optionFilterProp='label' value={informationDetail?.collectionIds}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Button type='link' onClick={() => {
                        router.navigate('/information/information-special-topic')
                      }}>新增资讯专题</Button>
                    </>
                  )}
                />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯封面</h3>} name='coverImageUrl' rules={formRules.all}>
                <Card title='' bordered={false} styles={{ body: { height: '150px' } }} >
                  <Upload
                    fileList={listImgs}
                    accept='.jpg, .jpeg, .gif, .png, .bmp'
                    listType='picture-card'
                    className='list-upload'
                    style={{ height: '100px', width: 'auto' }}
                    onChange={handleChangeListImgs}
                    maxCount={1}
                    customRequest={customUploadListImgs}
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
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(中文)</h3>} name='contentZh'>
                <RichTextEditor style={{ zIndex: "2" }} value={htmlZh} updateValue={(value) => setHtmlZh(value)}></RichTextEditor>
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(英文)</h3>} name='contentEn' >
                <RichTextEditor style={{ zIndex: "1" }} value={htmlEn} updateValue={(value) => setHtmlEn(value)}></RichTextEditor>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
                <Button type='primary' htmlType='submit'>
                  提交
                </Button>
                <Button style={{ marginLeft: '12px' }} onClick={resetForm}>
                  重置
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      )}
    </>
  )
}

export default InformationEdit
