import { type FC, useEffect, useState } from 'react'
import type { Rule } from 'antd/es/form'
import {
  Button,
  Card,
  Tag,
  Spin,
  Input,
  Form,
  Upload,
  UploadProps,
  UploadFile,
} from 'antd'
import { useLocation, useLoaderData } from 'react-router-dom'
import { getInformationDetailById } from '@/api'
import { PlusOutlined } from '@ant-design/icons'
import { UPLOAD_IMG_SRC } from '@/settings/websiteSetting'
import RichTextEditor from './components/RichText'
const InformationEdit: FC = () => {
  let id = useLocation()?.state?.id
  if (id === undefined) {
    id = (useLoaderData() as { id: any }).id
  }
  const [informationDetail, setInformationDetail] = useState<API.InformationInfoType | null>({
    id: 0,
    create_time: '',
    update_time: '',
    create_user: '',
    update_user: '',
    information_background_img: '',
    information_title_zh: '',
    information_title_en: '',
    information_content_zh: '',
    information_content_en: '',
    information_introduction_zh: '',
    information_introduction_en: '',
    information_label: [],
    information_special_topic: {
      id: 0,
      special_topic_name_zh: '',
      special_topic_name_en: '',
      special_topic_introduction_zh: '',
      special_topic_introduction_en: '',
      special_topic_background_img: '',
      special_topic_status: false,
      create_time: '',
      update_time: '',
      create_user: '',
      update_user: '',
    },
    information_status: false,
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [searchId, setSearchId] = useState<string>('')
  const [form] = Form.useForm()
  const [listImgs, setListImgs] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'beautiful-girl.jpg',
      status: 'done',
      url: UPLOAD_IMG_SRC,
      thumbUrl: UPLOAD_IMG_SRC
    }
  ])
  const [informationLabel, setInformationLabel] = useState<string[]>([])
  const [htmlEn, setHtmlEn] = useState('')
  const [htmlZh, setHtmlZh] = useState('')


  const formRules: Record<string, Rule[]> = {
    all: [
      { required: true, message: '内容不能为空' }
    ],
  }
  const onFinish = (values: any) => {
    console.log('Success:', values)
    console.log(informationLabel)
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
      getInformationDetailById({ id: Number(searchId) }).then((res: any) => {
        setInformationDetail({ ...res, information_special_topic: res.information_special_topic.id })
        setListImgs([{
          uid: '-1',
          name: res.information_background_img,
          status: 'done',
          url: res.information_background_img,
          thumbUrl: res.information_background_img
        }])
        setInformationLabel(res.information_label)
        setHtmlEn(res.information_content_en)
        setHtmlZh(res.information_content_zh)
        setLoading(false)
      })
    }
  }, [searchId])

  useEffect(() => {
    if (informationDetail?.information_content_en === htmlEn && informationDetail?.information_content_zh === htmlZh) {
      resetForm()
    }
  }, [informationDetail])

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setListImgs(newFileList)

  return (
    <>
      <Card bordered={false}>
        <Button type="primary">
          保存资讯
        </Button>
      </Card>
      <br />
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
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(中文)</h3>} name='information_title_zh' rules={formRules.all}>
                <Input style={{ width: '100%' }} placeholder='请输入中文标题' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题(英文)</h3>} name='information_title_en' rules={formRules.all}>
                <Input style={{ width: '100%' }} placeholder='请输入英文标题' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(中文)</h3>} name='information_introduction_zh' rules={formRules.all}>
                <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入中文简介' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介(英文)</h3>} name='information_introduction_en' rules={formRules.all}>
                <Input.TextArea rows={5} style={{ width: '100%' }} placeholder='请输入英文简介' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标签</h3>} name='information_label' rules={formRules.all}>
                {informationDetail?.information_label.map((label: API.InformationLabelType, index: number) => <Tag key={index} color="orange" closable onClose={() => { informationLabel.splice(index, 1) }}>{label.label_name}</Tag>)}
                <Tag color="orange" onClick={() => { setInformationLabel([...informationLabel, 'new']) }}>添加标签</Tag>
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯专题(中文)</h3>} name='information_special_topic' rules={formRules.all}>
                <Input style={{ width: '100%' }} placeholder='请输入中文专题' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯专题(英文)</h3>} name='information_special_topic' rules={formRules.all}>
                <Input style={{ width: '100%' }} placeholder='请输入英文专题' />
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯封面</h3>} name='information_background_img' rules={formRules.all}>
                <Card title='' bordered={false} bodyStyle={{ height: '150px' }}>
                  <Upload
                    fileList={listImgs}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    accept='.jpg, .jpeg, .gif, .png, .bmp'
                    listType='picture-card'
                    className='list-upload'
                    style={{ height: '100px', width: 'auto' }}
                    onChange={handleChange}
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
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(中文)</h3>} name='information_content_zh' rules={formRules.all}>
                <RichTextEditor style={{ zIndex: "2" }} value={htmlZh} updateValue={(value) => setHtmlZh(value)}></RichTextEditor>
              </Form.Item>
              <Form.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容(英文)</h3>} name='information_content_en' rules={formRules.all} >
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
