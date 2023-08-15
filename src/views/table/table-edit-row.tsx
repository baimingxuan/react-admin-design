import React, { useState } from 'react'
import type { ColumnType } from 'antd/es/table'
import { Form, Button, Table, Select, Switch, InputNumber, Input, DatePicker, Radio, Checkbox, Card, Popconfirm, Space } from 'antd'
import { PageWrapper } from '@/components/Page'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { TABLE_EDIT_COMPO } from '@/settings/websiteSetting'
import { tableData, DataItem } from '../excel/export-excel/data'

interface ColumnState {
  key: number
  name: string
  sex: string
  birth: string
  education: string
  hobby: string
  forbid: boolean
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  cellType: 'number' | 'text'
  record: ColumnState
  index: number
  children: React.ReactNode
}

const theadMap = {
  key: '数字输入框',
  name: '输入框',
  sex: '单选框',
  birth: '日期选择框',
  education: '选择器',
  hobby: '多选框',
  forbid: '开关',
  action: '按钮'
}

const TableEditRow: React.FC = () => {
  const { Column } = Table

  return (
    <PageWrapper plugin={TABLE_EDIT_COMPO}>
      <Card bordered={false}>
        <Table
          dataSource={tableData}
          pagination={false}
        >
          <Column
            title={
              () => (
                <>
                  <span>编号</span>
                  <p className='sub-title'>(数字输入框)</p>
                </>
              )
            }
            dataIndex='key'
            align='center'
            width={70}
            sorter
            render={
              (text, record: any) => (
                record.editable
                ? <InputNumber
                    defaultValue={record.key}
                    onChange={(value) => record.key = value}
                    min={1000}
                    max={2000}
                  />
                : <span>{text}</span>
              )
            }
          />
        </Table>
      </Card>
    </PageWrapper>
  )
}

export default TableEditRow