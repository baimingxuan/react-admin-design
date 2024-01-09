import React, { useState } from 'react'
import {
  Form,
  Button,
  Table,
  Select,
  Switch,
  InputNumber,
  Input,
  DatePicker,
  Radio,
  Checkbox,
  Card,
  Popconfirm,
  Space
} from 'antd'
import type { ColumnType } from 'antd/es/table'
import { PageWrapper } from '@/components/Page'
import dayjs from 'dayjs'
import { TABLE_EDIT_COMPO } from '@/settings/websiteSetting'
import { tableData, type DataItem } from './data'

type CellType = 'number' | 'text' | 'radio' | 'date' | 'select' | 'checkbox' | 'switch'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  cellType: CellType
  record: DataItem
  index: number
  children: React.ReactNode
}

type theadKey = Record<string, { title: string; type: string }>
const theadMap: theadKey = {
  key: { title: '数字输入框', type: 'number' },
  name: { title: '输入框', type: 'text' },
  sex: { title: '单选框', type: 'radio' },
  birth: { title: '日期选择框', type: 'date' },
  education: { title: '选择器', type: 'select' },
  hobby: { title: '多选框', type: 'checkbox' },
  forbid: { title: '开关', type: 'switch' },
  action: { title: '按钮', type: 'button' }
}

const nodeType = (type: CellType, record: DataItem) => {
  switch (type) {
    case 'number':
      return <InputNumber min={1000} max={2000} />
    case 'text':
      return <Input />
    case 'radio':
      return <Radio.Group options={['男', '女'].map(item => ({ value: item, label: item }))} />
    case 'date':
      return (
        <div>
          <DatePicker defaultValue={dayjs(record.birth, 'YYYY-MM-DD')} format='YYYY-MM-DD' />
        </div>
      )
    case 'select':
      return (
        <Select options={['初中', '高中', '大专', '本科'].map(item => ({ value: item }))} style={{ width: '80px' }} />
      )
    case 'checkbox':
      return <Checkbox.Group options={record.hobby.split('、')} defaultValue={record.hobby.split('、')} />
    case 'switch':
      return <Switch defaultChecked={record.forbid} />
  }
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  cellType,
  record,
  children,
  ...restProps
}) => {
  const cellNode = nodeType(cellType, record)

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {cellNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const TableEditRow: React.FC = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState(tableData)
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: DataItem) => record.key === editingKey

  const edit = (record: Partial<DataItem>) => {
    form.setFieldsValue({ ...record })
    setEditingKey(record.key!)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataItem

      const newData = [...data]
      const index = newData.findIndex(item => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  // @ts-ignore
  const columns: ColumnType[] = [
    {
      title: () => {
        return (
          <>
            <span>编号</span>
            <p className='sub-title'>(数字输入框)</p>
          </>
        )
      },
      dataIndex: 'key',
      width: 70,
      editable: true,
      align: 'center'
    },
    {
      title: () => {
        return (
          <>
            <span>姓名</span>
            <p className='sub-title'>(输入框)</p>
          </>
        )
      },
      dataIndex: 'name',
      width: 110,
      editable: true,
      align: 'center'
    },
    {
      title: () => {
        return (
          <>
            <span>性别</span>
            <p className='sub-title'>(单选框)</p>
          </>
        )
      },
      dataIndex: 'sex',
      width: 120,
      editable: true,
      align: 'center'
    },
    {
      title: () => {
        return (
          <>
            <span>生日</span>
            <p className='sub-title'>(日期选择器)</p>
          </>
        )
      },
      dataIndex: 'birth',
      width: 140,
      editable: true,
      align: 'center'
    },
    {
      title: () => {
        return (
          <>
            <span>学历</span>
            <p className='sub-title'>(选择器)</p>
          </>
        )
      },
      dataIndex: 'education',
      width: 80,
      editable: true,
      align: 'center'
    },
    {
      title: () => {
        return (
          <>
            <span>爱好</span>
            <p className='sub-title'>(多选框)</p>
          </>
        )
      },
      dataIndex: 'hobby',
      width: 250,
      editable: true,
      align: 'center'
    },
    {
      title: () => {
        return (
          <>
            <span>禁止编辑</span>
            <p className='sub-title'>(开关)</p>
          </>
        )
      },
      dataIndex: 'forbid',
      width: 70,
      editable: true,
      align: 'center',
      render: (text: string, record: DataItem) => {
        return <span>{record.forbid ? '是' : '否'}</span>
      }
    },
    {
      title: () => {
        return (
          <>
            <span>操作</span>
            <p className='sub-title'>(按钮)</p>
          </>
        )
      },
      dataIndex: 'action',
      width: 70,
      align: 'center',
      render: (_: any, record: DataItem) => {
        const editable = isEditing(record)
        return editable ? (
          <Space>
            <Button type='primary' ghost onClick={() => save(record.key)}>
              保存
            </Button>
            <Popconfirm title='是否取消编辑？' onConfirm={cancel}>
              <Button type='primary' danger ghost>
                取消
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑
          </Button>
        )
      }
    }
  ]

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataItem) => ({
        record,
        cellType: theadMap[col.dataIndex].type,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    }
  })

  return (
    <PageWrapper plugin={TABLE_EDIT_COMPO}>
      <Card bordered={false}>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell
              }
            }}
            dataSource={data}
            columns={mergedColumns}
            pagination={false}
          />
        </Form>
      </Card>
    </PageWrapper>
  )
}

export default TableEditRow
