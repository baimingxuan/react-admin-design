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
import { postInformationDetailById } from '@/api'
import dayjs from 'dayjs'
const InformationDetail: FC = () => {
  const id = useLocation()?.state?.id
  const [informationDetail, setInformationDetail] = useState<API.InformationInfoType | null>(null)
  const [tags, setTags] = useState<API.InformationLabelType[]>([])
  const [collections, setCollections] = useState<API.InformationSpecialTopicType[]>([])
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
      postInformationDetailById({ id: Number(searchId) }).then((res: API.InformationDetailResult) => {
        setInformationDetail(res.data.article)
        setTags(res.data.tags)
        setCollections(res.data.collections)
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
                    <Select.Option value="zhHans">简体中文</Select.Option>
                    <Select.Option value="zh">繁体中文</Select.Option>
                    <Select.Option value="ko">韩语</Select.Option>
                    <Select.Option value="es">西班牙语</Select.Option>
                  </Select>
                </Space>
              </div>} column={1}>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯编号</h3>}>{informationDetail?.id}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标题</h3>}>{selectLanguage === 'zhHans' ? informationDetail?.titleZhHans : selectLanguage === 'zh' ? informationDetail?.titleZh : selectLanguage === 'en' ? informationDetail?.titleEn : selectLanguage === 'ko' ? informationDetail?.titleKr : selectLanguage === 'es' ? informationDetail?.titleEs : ''}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯封面</h3>}>
                <img src={informationDetail?.coverImageUrl} alt="资讯封面" style={{ width: '200px', height: '100px' }} />
              </Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯标签</h3>}>
                {tags?.map((tag, index: number) => <Tag key={index} color="orange">{tag.name}</Tag>)}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯专题</h3>}>
                {collections?.map((collection, index: number) => <Tag key={index} color="purple">{selectLanguage === 'zhHans' ? collection.nameZhHans : selectLanguage === 'zh' ? collection.nameZh : selectLanguage === 'en' ? collection.nameEn : selectLanguage === 'ko' ? collection.nameKr : selectLanguage === 'es' ? collection.nameEs : ''}</Tag>)}
              </Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯简介</h3>}>{selectLanguage === 'zhHans' ? informationDetail?.descriptionZhHans : selectLanguage === 'zh' ? informationDetail?.descriptionZh : selectLanguage === 'en' ? informationDetail?.descriptionEn : selectLanguage === 'ko' ? informationDetail?.descriptionKr : selectLanguage === 'es' ? informationDetail?.descriptionEs : ''}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>资讯内容</h3>}> <div dangerouslySetInnerHTML={{ __html: (selectLanguage === 'zhHans' ? informationDetail?.contentZhHans : selectLanguage === 'zh' ? informationDetail?.contentZh : selectLanguage === 'en' ? informationDetail?.contentEn : selectLanguage === 'ko' ? informationDetail?.contentKr : selectLanguage === 'es' ? informationDetail?.contentEs : '') || '' }}></div> </Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>添加时间</h3>}>{dayjs(informationDetail?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
              <Descriptions.Item label={<h3 style={{ whiteSpace: 'nowrap' }}>更新时间</h3>}>{dayjs(informationDetail?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      )}
    </>
  )
}

export default InformationDetail
