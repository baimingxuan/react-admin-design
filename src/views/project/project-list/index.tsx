import type { ColumnsType } from 'antd/es/table'
import { type FC, useState, useEffect } from 'react'
import {
    Card,
    Button,
    Table,
    Space,
    Modal,
    Input,
    message,
    Form,
    Select,
    Popover,
    Tag
} from 'antd'
import { getProjectList, postUpdateProject } from '@/api'
import dayjs from 'dayjs'

const ProjectList: FC = () => {
    const [form] = Form.useForm()
    const [tableLoading, setTableLoading] = useState(false)
    const [tableData, setTableData] = useState<API.ProjectType[]>([])
    const [tableTotal, setTableTotal] = useState<number>(0)
    const [tableQuery, setTableQuery] = useState<API.PageState>({ page: 1, size: 10 })
    const [query, setQuery] = useState<string>('')
    const [status, setStatus] = useState<0 | 1 | 2 | 3>(2)
    const [selectLanguage, setSelectLanguage] = useState<string>('zhHans')
    const [showAddTable, setShowAddTable] = useState<boolean>(false)
    const [loadingEdit, setLoadingEdit] = useState<boolean>(false)

    const columns: ColumnsType<API.ProjectType> = [
        {
            title: 'Token详情',
            dataIndex: 'address',
            align: 'center',
            ellipsis: true,
            render: (address, row) => {
                return <>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img width={24} height={24} style={{ borderRadius: '50%', overflow: 'hidden', width: '24px', height: '24px' }} src={row.logoUri} alt="icon" />
                            <span style={{ marginLeft: '10px' }}>{row.symbol}</span>
                        </div>
                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#999', width: '100%', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {address}
                        </div>
                    </div>
                </>
            }
        },
        {
            title: '项目名称',
            dataIndex: 'name',
            align: 'center',
            render: (name, record) => {
                const content = (
                    <div style={{ width: '300px' }}>
                        <p>项目简介：<br />{selectLanguage === 'zhHans' ? record.DescriptionZhHans : selectLanguage === 'zh' ? record.descriptionZh : selectLanguage === 'en' ? record.descriptionEn : selectLanguage === 'ko' ? record.descriptionKr : selectLanguage === 'es' ? record.descriptionEs : ''}</p>
                    </div>
                )
                return (
                    <Popover content={content}>
                        <Tag color="purple" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</Tag>
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
            title: '项目官网',
            dataIndex: 'websiteUrl',
            align: 'center',
            ellipsis: true,
            render: (websiteUrl) => {
                return <a href={websiteUrl} target='_blank' rel='noreferrer'>{websiteUrl}</a>
            }
        },
        {
            title: 'X地址',
            dataIndex: 'xUrl',
            align: 'center',
            ellipsis: true,
            render: (xUrl) => {
                return <a href={xUrl} target='_blank' rel='noreferrer'>{xUrl}</a>
            }
        },

        {
            title: '操作',
            key: 'status',
            align: 'center',
            render: (_, record: API.ProjectType) => (
                <Space>
                    <Button type="primary" onClick={() => { handleEdit(record.address) }}>
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

    useEffect(() => {
        setTableQuery({ ...tableQuery, page: 1 })
        fetchData(1, query)
    }, [status])

    async function fetchData(page?: number, query?: string) {
        if (tableLoading) return
        setTableLoading(true)
        if (page) {
            getProjectList({ ...tableQuery, page: page || tableQuery.page, status, query }).then((res: any) => {
                if (res.code !== 0) {
                    return message.error("获取数据失败,错误码:" + res.code)
                }
                setTableData(res.data.tokens)
                setTableTotal(res.data.total)
            }).catch(() => {
                message.error('获取项目列表失败')
            }).finally(() => {
                setTableLoading(false)
            })
        } else {
            getProjectList({ ...tableQuery, status, query }).then((res: any) => {
                if (res.code !== 0) {
                    return message.error("获取数据失败,错误码:" + res.code)
                }
                const { tokens, total } = res.data
                setTableData(tokens)
                setTableTotal(total)
            }).catch(() => {
                message.error('获取项目列表失败')
            }).finally(() => {
                setTableLoading(false)
            })
        }
    }

    function handlePageChange(page: number, size: number) {
        setTableQuery({ ...tableQuery, page, size })
    }




    function handleEdit(address: string) {
        let item = tableData.find((item) => item.address === address)
        form.setFieldsValue({ ...item })
        setShowAddTable(true)
    }


    const onFinish = (values: any) => {
        setLoadingEdit(true)
        editOnFinish(values)
    }

    const editOnFinish = async (values: any) => {
        setLoadingEdit(true)
        postUpdateProject({ ...values, descriptionZhHans: values.DescriptionZhHans }).then((res: any) => {
            if (res.code !== 0) {
                return message.error("修改项目失败,错误码:" + res.code)
            }
            message.success('修改项目成功')
            fetchData()
            setShowAddTable(false)
        }).catch(() => {
            message.error('修改项目失败')
        }).finally(() => {
            setLoadingEdit(false)
        })
    }



    return (
        <>
            <Card bordered={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Space>
                        <Space>
                            <h3>选择状态:</h3>
                            <Select value={status} onChange={(value) => { setStatus(value) }}>
                                <Select.Option value={0}>已忽略</Select.Option>
                                <Select.Option value={1}>新建</Select.Option>
                                <Select.Option value={2}>推荐中</Select.Option>
                                <Select.Option value={3}>已删除</Select.Option>
                            </Select>
                        </Space>
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
                        <Space>
                            <h3>搜索：</h3>
                            <Input placeholder='请输入搜索内容' value={query} onChange={(e) => setQuery(e.target.value)} />
                            <Button type='primary' onClick={() => fetchData(1, query)}>搜索</Button>
                            <Button type='primary' danger onClick={() => { setQuery(''); }}>重置</Button>
                        </Space>
                    </Space>
                </div>
            </Card>
            <br />
            <Card bordered={false}>
                <Table
                    rowKey='address'
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
                    title={'修改项目'}
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
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>Token地址</h4>} name='address'>
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>官网</h4>} name='websiteUrl'>
                                    <Input />
                                </Form.Item>
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>X地址</h4>} name='xUrl'>
                                    <Input />
                                </Form.Item>
                                {/* 项目描述 */}
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>英文项目描述</h4>} name='descriptionEn'>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>简体中文项目描述</h4>} name='DescriptionZhHans'>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>繁体中文项目描述</h4>} name='descriptionZh'>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>韩语项目描述</h4>} name='descriptionKr'>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>西班牙语项目描述</h4>} name='descriptionEs'>
                                    <Input.TextArea rows={4} />
                                </Form.Item>
                                <Form.Item label={<h4 style={{ whiteSpace: 'nowrap' }}>项目状态</h4>} name='status' rules={[{ required: true, message: '请选择项目状态' }]}>
                                    <Select>
                                        <Select.Option value={0}>已忽略</Select.Option>
                                        <Select.Option value={1}>新增专题</Select.Option>
                                        <Select.Option value={2}>推荐中</Select.Option>
                                        <Select.Option value={3}>已删除</Select.Option>
                                    </Select>
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

export default ProjectList

