import { type FC, useEffect, useState } from 'react'
import { useLocation, useLoaderData, useNavigate } from 'react-router-dom'

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

import { postInformationDetailById, postAddInformation, postInformationUpdate, getSearchInformationLabel, getSearchInformationSpecialTopic, uploadImage, postInformationTranslate } from '@/api'
import RichTextEditor from './components/RichText'

import { useAppSelector } from '@/stores'
import { uploadImgToBase64 } from '@/utils/image'
const InformationEdit: FC = () => {
  const router = useNavigate()
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
    titleZhHans: '',
    titleEn: '',
    titleKr: '',
    titleEs: '',
    contentZh: '',
    contentZhHans: '',
    contentEn: '',
    contentKr: '',
    contentEs: '',
    descriptionZh: '',
    descriptionZhHans: '',
    descriptionEn: '',
    descriptionKr: '',
    descriptionEs: '',
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
  const [htmlKr, setHtmlKr] = useState('')
  const [htmlEs, setHtmlEs] = useState('')
  const [htmlZhHans, setHtmlZhHans] = useState('')
  const [isTranslate, setIsTranslate] = useState(false)
  const [selectSpecialTopicZhList, setSelectSpecialTopicZhList] = useState<{ value: number, label: string }[]>([])
  const [selectLabelList, setSelectLabelList] = useState<{ value: number, label: string }[]>([])
  const { userInfo } = useAppSelector(state => state.user)

  useEffect(() => {
    // 获取所有专题
    getSearchInformationSpecialTopic({}).then((res: API.InformationSpecialTopicListResult) => {
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
    let isTranslate = values.titleEn ? false : true
    if (loading) return
    setLoading(true)
    if (values.id === 0) {
      delete values.id
      postAddInformation({ ...values, author: userInfo?.username }).then((res: any) => {
        if (res.code === 0) {
          message.success('资讯添加成功')
          setInformationDetail({ ...values, id: res.data.id })
          if (isTranslate) {
            translate(res.data.id)
          } else {
            router("/information/information-content/information-detail", { state: { id: res.data.id } })
          }
        } else {
          message.error(res.msg || '资讯添加失败')
        }
      }).catch((err: any) => {
        message.error(err.msg || '资讯添加失败')
      }).finally(() => {
        setLoading(false)
      })
    } else {
      // update
      postInformationUpdate({ ...values, }).then((res: any) => {
        if (res.code === 0) {
          message.success('资讯修改成功')
          if (isTranslate) {
            translate(res.data.id)
          } else {
            router("/information/information-content/information-detail", { state: { id: res.data.id } })
          }
        } else {
          message.error(res.msg || '资讯修改失败')
        }
      }).catch((err: any) => {
        message.error(err.msg || '资讯修改失败')
      }).finally(() => {
        setLoading(false)
      })
    }
  }

  const translate = (id: number) => {
    if (isTranslate) return
    setIsTranslate(true)
    postInformationTranslate({ id }).then((res: any) => {
      if (res.code === 0) {
        message.success('资讯翻译成功')
        loadData(id)
      } else {
        message.error(res.msg || '资讯翻译失败')
      }
    }).catch((err: any) => {
      message.error(err.msg || '资讯翻译失败')
    }).finally(() => {
      setIsTranslate(false)
    })
  }

  const onTranslate = () => {
    let values = form.getFieldsValue()
    setLoading(true)
    postInformationUpdate({ ...values, isActive: false }).then((res: any) => {
      if (res.code === 0) {
        translate(Number(searchId))
      } else {
        message.error("更新失败")
      }
    }).catch((err: any) => {
      message.error(err.msg || '更新失败')
    }).finally(() => {
      setLoading(false)
    })
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
      loadData(Number(searchId))
    }
  }, [searchId])

  const loadData = (id: number) => {
    setLoading(true)
    postInformationDetailById({ id }).then((res: API.InformationDetailResult) => {
      let resData = res.data.article
      resData.contentEn = checkHtml(resData.contentEn)
      resData.contentZh = checkHtml(resData.contentZh)
      resData.contentKr = checkHtml(resData.contentKr)
      resData.contentEs = checkHtml(resData.contentEs)
      resData.contentZhHans = checkHtml(resData.contentZhHans)
      setInformationDetail({
        ...resData,
        tagIds: res.data?.tags?.map((item: any) => item.id) || [],
        collectionIds: res.data?.collections?.map((item: any) => item.id) || [],
      })
      if (resData.coverImageUrl) {
        setListImgs([{
          uid: '-1',
          name: resData.coverImageUrl,
          status: 'done',
          url: resData.coverImageUrl,
          thumbUrl: resData.coverImageUrl
        }])
      } else {
        setListImgs([])
      }
      setHtmlEn(resData.contentEn)
      setHtmlZh(resData.contentZh)
      setHtmlKr(resData.contentKr)
      setHtmlEs(resData.contentEs)
      setHtmlZhHans(resData.contentZhHans)
    }).catch((err: any) => {
      message.error(err.msg || '资讯加载失败')
    }).finally(() => {
      setLoading(false)
    })
  }

  const checkHtml = (value: string) => {
    // 判断 value 是否是 html合规
    // 格式（ul标签的子标签必须是li）
    if (value === "" || value === "<p><br></p>") return value
    const ulRegex = /<ul>(.*?)<\/ul>/g
    const liRegex = /<li>(.*?)<\/li>/g
    let html = value
    if (ulRegex.test(html)) {
      const ulMatches = html.match(ulRegex)
      if (ulMatches) {
        ulMatches.forEach(ul => {
          const liMatches = ul.match(liRegex)
          if (liMatches) {
            // 去掉 ul 标签
            ul = ul.replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            html = html.replace(ul, liMatches.join(''))
          }
        })
      }
    }
    return html
  }

  useEffect(() => {
    if (htmlEn || htmlZh || htmlKr || htmlEs || htmlZhHans) {
      if (informationDetail?.contentEn === htmlEn
        && informationDetail?.contentZh === htmlZh
        && informationDetail?.contentKr === htmlKr
        && informationDetail?.contentEs === htmlEs
        && informationDetail?.contentZhHans === htmlZhHans) {
        setTimeout(() => {
          resetForm()
        }, 10);
      }
    }
  }, [informationDetail, htmlEn, htmlZh, htmlKr, htmlEs, htmlZhHans])

  const handleChangeListImgs: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setListImgs(newFileList)
    form.setFieldValue("coverImageUrl", newFileList[0]?.response?.data?.url || "")
  }

  const customUploadListImgs: UploadProps['customRequest'] = async (e) => {
    // 将图片转换为base64
    const base64 = await uploadImgToBase64(e.file as File) as { result: string }
    uploadImage({ image: base64.result.replace(/.*;base64,/, '') }).then((res) => {
      if (res.code !== 0) {
        e.onError?.({
          status: res.code,
          message: '上传失败',
          name: ""
        })
        return message.error("上传图片失败,错误码:" + res.code)
      }
      e.onSuccess?.({
        data: {
          url: res.data.imageUrl + "/wideThumbnail",
          name: '',
          status: "done",
          thumbUrl: res.data.imageUrl + "/wideThumbnail"
        }
      });
      form.setFieldValue("coverImageUrl", res.data.imageUrl + "/wideThumbnail")
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
      <Spin spinning={loading} tip="加载中..." >
        <Spin spinning={isTranslate} tip="翻译中...">
          {!searchId && id !== 'add' && <Input.Search style={{ width: '300px' }} placeholder="请输入资讯编号" onSearch={(value) => { setSearchId(value) }} />}
          {(searchId || id === 'add') && (
            <Card bordered={false} >
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
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯状态</h3>} name='isActive' rules={formRules.all}>
                    <Select options={[{ label: '启用', value: true }, { label: '禁用', value: false }]} />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(简体中文)</h3>} name='titleZhHans' rules={formRules.all}>
                    <Input style={{ width: '100%' }} placeholder='请输入简体中文标题' />
                  </Form.Item>}
                  <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(繁体中文)</h3>} name='titleZh' rules={formRules.all}>
                    <Input style={{ width: '100%' }} placeholder='请输入繁体中文标题' />
                  </Form.Item>
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(英文)</h3>} name='titleEn' rules={formRules.all}>
                    <Input style={{ width: '100%' }} placeholder='请输入英文标题' />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(韩语)</h3>} name='titleKr' rules={formRules.all}>
                    <Input style={{ width: '100%' }} placeholder='请输入韩语标题' />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(西班牙语)</h3>} name='titleEs' rules={formRules.all}>
                    <Input style={{ width: '100%' }} placeholder='请输入西班牙语标题' />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯封面</h3>} name='coverImageUrl' rules={formRules.all}>
                    <Card title='' bordered={false} bodyStyle={{ height: '150px' }} >
                      <Upload
                        fileList={listImgs}
                        accept='.jpg, .jpeg, .gif, .png, .bmp, .svg'
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
                            <div style={{ marginTop: '8px' }}>点击上传（建议尺寸: W:278px H:157px）</div>
                          </div>
                        )}
                      </Upload>
                    </Card>
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(简体中文)</h3>} name='descriptionZhHans' rules={formRules.all}>
                    <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入简体中文简介' />
                  </Form.Item>}
                  <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(繁体中文)</h3>} name='descriptionZh' rules={formRules.all}>
                    <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入繁体中文简介' />
                  </Form.Item>
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(英文)</h3>} name='descriptionEn' rules={formRules.all}>
                    <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入英文简介' />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(韩语)</h3>} name='descriptionKr' rules={formRules.all}>
                    <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入韩语简介' />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(西班牙语)</h3>} name='descriptionEs' rules={formRules.all}>
                    <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入西班牙语简介' />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标签</h3>} name='tagIds'>
                    <Select mode='multiple' placeholder='请选择资讯标签' options={selectLabelList} optionFilterProp='label' value={informationDetail?.tagIds}
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: '8px 0' }} />
                          <Button type='link' onClick={() => {
                            router('/information/information-label')
                          }}>新增资讯标签</Button>
                        </>
                      )}
                    />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯专题(繁体中文)</h3>} name='collectionIds' >
                    <Select mode='multiple' placeholder='请选择资讯专题' options={selectSpecialTopicZhList} optionFilterProp='label' value={informationDetail?.collectionIds}
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider style={{ margin: '8px 0' }} />
                          <Button type='link' onClick={() => {
                            router('/information/information-special-topic')
                          }}>新增资讯专题</Button>
                        </>
                      )}
                    />
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(简体中文)</h3>} name='contentZhHans' rules={formRules.all}>
                    <RichTextEditor style={{ zIndex: "5" }} value={htmlZhHans} updateValue={(value) => { setHtmlZhHans(value); form.setFieldValue("contentZhHans", value) }}></RichTextEditor>
                  </Form.Item>}
                  <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(繁体中文)</h3>} name='contentZh' rules={formRules.all}>
                    <RichTextEditor style={{ zIndex: "4" }} value={htmlZh} updateValue={(value) => { setHtmlZh(value); form.setFieldValue("contentZh", value) }}></RichTextEditor>
                  </Form.Item>
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(英文)</h3>} name='contentEn' rules={formRules.all}>
                    <RichTextEditor style={{ zIndex: "3" }} value={htmlEn} updateValue={(value) => { setHtmlEn(value); form.setFieldValue("contentEn", value) }}></RichTextEditor>
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(韩语)</h3>} name='contentKr' rules={formRules.all}>
                    <RichTextEditor style={{ zIndex: "2" }} value={htmlKr} updateValue={(value) => { setHtmlKr(value); form.setFieldValue("contentKr", value) }}></RichTextEditor>
                  </Form.Item>}
                  {informationDetail?.titleEn && <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(西班牙语)</h3>} name='contentEs' rules={formRules.all}>
                    <RichTextEditor style={{ zIndex: "1" }} value={htmlEs} updateValue={(value) => { setHtmlEs(value); form.setFieldValue("contentEs", value) }}></RichTextEditor>
                  </Form.Item>}
                  <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
                    {informationDetail?.titleEn &&
                      <Button type='primary' disabled={isTranslate || loading} style={{ marginLeft: '12px' }} onClick={onTranslate}>
                        翻译
                      </Button>}
                    <Button disabled={isTranslate || loading} style={{ marginLeft: '12px' }} type='primary' htmlType='submit'>
                      {!informationDetail?.titleEn ? '翻译' : '修改'}
                    </Button>
                    <Button disabled={isTranslate || loading} style={{ marginLeft: '12px' }} onClick={resetForm}>
                      重置
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          )}
        </Spin>
      </Spin >
    </>
  )
}

export default InformationEdit
