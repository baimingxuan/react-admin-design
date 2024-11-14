import { type FC, useEffect, useState } from 'react'
import {
  Button,
  Card,
  Descriptions,
  Select,
  Space,
  Tag,
  Spin,
  Input,
} from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { getInformationDetailById } from '@/api'
import dayjs from 'dayjs'
const InformationDetail: FC = () => {
  const id = useLocation()?.state?.id
  const [informationDetail, setInformationDetail] = useState<API.InformationInfoType | null>(null)
  const [selectLanguage, setSelectLanguage] = useState<string>('zh')
  const [loading, setLoading] = useState<boolean>(false)
  const [searchId, setSearchId] = useState<string>('')
  useEffect(() => {
    if (id) {
      setSearchId(id)
    }
  }, [id])

  useEffect(() => {
    if (searchId) {
      setLoading(true)
      getInformationDetailById({ id: Number(searchId) }).then((res: any) => {
        setInformationDetail(res)
        setLoading(false)
      })
    }
  }, [searchId])

  return (
    <>
      <Card bordered={false}>
        <Button type="primary">
          <Link to="/information/information-content/information-edit" state={{ id: searchId }}>修改资讯</Link>
        </Button>
      </Card>
      <br />
      {loading && <Spin spinning={loading} tip="加载中..." />}
      {!searchId && <Input.Search style={{ width: '300px' }} placeholder="请输入资讯编号" onSearch={(value) => { setSearchId(value) }} />}
      {!loading && searchId && (
        <Card bordered={false}>
          <div style={{ overflowX: 'scroll' }}>
            <Descriptions style={{ width: '1200px', margin: '0 auto' }} bordered title={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>资讯详情</h1>
                <Space>
                  <h3>选择语言:</h3>
                  <Select value={selectLanguage} onChange={(value) => { setSelectLanguage(value) }}>
                    <Select.Option value="en">英文</Select.Option>
                    <Select.Option value="zh">中文</Select.Option>
                  </Select>
                </Space>
              </div>} column={1}>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯编号</h3>}>{informationDetail?.id}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题</h3>}>{selectLanguage === 'zh' ? informationDetail?.information_title_zh : informationDetail?.information_title_en}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯封面</h3>}>
                <img src={informationDetail?.information_background_img} alt="资讯封面" style={{ width: '200px', height: '100px' }} />
              </Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标签</h3>}>{informationDetail?.information_label.map((label: API.InformationLabelType, index: number) => <Tag key={index} color="orange">{label.label_name}</Tag>)}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯专题</h3>}>
                <Tag color="purple">{selectLanguage === 'zh' ? informationDetail?.information_special_topic.special_topic_name_zh : informationDetail?.information_special_topic.special_topic_name_en}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介</h3>}>{selectLanguage === 'zh' ? informationDetail?.information_introduction_zh : informationDetail?.information_introduction_en}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容</h3>}> <div dangerouslySetInnerHTML={{ __html: (selectLanguage === 'zh' ? informationDetail?.information_content_zh : informationDetail?.information_content_en) || '' }}></div> </Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>添加时间</h3>}>{dayjs(informationDetail?.create_time).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>更新时间</h3>}>{dayjs(informationDetail?.update_time).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      )}
    </>
  )
}

export default InformationDetail
