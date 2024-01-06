import type { DataNode } from 'antd/es/tree'
import React, { useState } from 'react'
import { Row, Col, Card, Transfer, Table, Tree } from 'antd'
import { PageWrapper } from '@/components/Page'
import { TRANSFER_COMPO } from '@/settings/websiteSetting'
import { mockData, treeData, transferDataSource } from './data'

const TransferPage: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState(['1', '5'])
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['2', '6'])
  const [treeTargetKeys, setTreeTargetKeys] = useState<string[]>([])

  const onChange = (nextTargetKeys: string[]) => {
    setTargetKeys(nextTargetKeys)
  }

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const isChecked = (selectedKeys: (string | number)[], eventKey: string | number) => selectedKeys.includes(eventKey)

  const generateTree = (treeNodes: DataNode[] = [], checkedKeys: string[] = []): DataNode[] =>
    treeNodes.map(({ children, ...props }) => ({
      ...props,
      disabled: checkedKeys.includes(props.key as string),
      children: generateTree(children, checkedKeys)
    }))

  const handleChange = (nextTargetKeys: string[]) => {
    setTreeTargetKeys(nextTargetKeys)
  }

  const getRowSelection = ({ selectedKeys, onItemSelectAll, onItemSelect }: Record<string, any>) => {
    return {
      onSelectAll(selected: boolean, selectedRows: Record<string, string | boolean>[]) {
        const treeSelectedKeys = selectedRows.filter(item => !item.disabled).map(({ key }) => key)
        onItemSelectAll(treeSelectedKeys, selected)
      },
      onSelect({ key }: Record<string, string>, selected: boolean) {
        onItemSelect(key, selected)
      },
      selectedRowKeys: selectedKeys
    }
  }

  return (
    <PageWrapper plugin={TRANSFER_COMPO}>
      <Row gutter={12}>
        <Col span={8}>
          <Card title='基础用法' bordered={false} bodyStyle={{ height: '420px' }}>
            <Transfer
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              dataSource={mockData}
              render={item => item.title}
              listStyle={{ width: '230px', height: '360px' }}
              locale={{ itemsUnit: '项 ' }}
              onChange={onChange}
              onSelectChange={onSelectChange}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title='树穿梭框' bordered={false} bodyStyle={{ height: '420px' }}>
            <Transfer
              targetKeys={treeTargetKeys}
              dataSource={transferDataSource}
              render={item => item.title}
              showSelectAll={false}
              listStyle={{ width: '230px', height: '360px' }}
              onChange={handleChange}
            >
              {({ direction, selectedKeys, onItemSelect }) => {
                if (direction === 'left') {
                  const treeCheckedKeys = [...selectedKeys, ...treeTargetKeys]
                  return (
                    <Tree
                      blockNode
                      checkable
                      checkStrictly
                      defaultExpandAll
                      checkedKeys={treeCheckedKeys}
                      treeData={generateTree(treeData, treeTargetKeys)}
                      onCheck={(_, { node: { key } }) => {
                        onItemSelect(key as string, !isChecked(treeCheckedKeys, key as string))
                      }}
                      onSelect={(_, { node: { key } }) => {
                        onItemSelect(key as string, !isChecked(treeCheckedKeys, key as string))
                      }}
                    />
                  )
                }
              }}
            </Transfer>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='表格穿梭框' bordered={false} bodyStyle={{ height: '420px' }}>
            <Transfer
              targetKeys={targetKeys}
              dataSource={mockData}
              listStyle={{ width: '230px', height: '360px' }}
              locale={{ itemsUnit: '项 ' }}
              onChange={onChange}
            >
              {({ filteredItems, selectedKeys, onItemSelectAll, onItemSelect }) => (
                <Table
                  rowSelection={getRowSelection({ selectedKeys, onItemSelectAll, onItemSelect })}
                  columns={[{ dataIndex: 'title', title: 'Name' }]}
                  dataSource={filteredItems}
                  size='small'
                  pagination={false}
                  onRow={({ key }) => ({
                    onClick: () => {
                      onItemSelect(key, !selectedKeys.includes(key))
                    }
                  })}
                />
              )}
            </Transfer>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default TransferPage
