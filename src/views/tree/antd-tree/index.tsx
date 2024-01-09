import { useState } from 'react'
import { Row, Col, Card, Tree } from 'antd'
import { TREE_COMPO } from '@/settings/websiteSetting'
import { PageWrapper } from '@/components/Page'
import { treeData } from './data'

interface DataNode {
  title: string
  key: string
  isLeaf?: boolean
  children?: DataNode[]
}

const initTreeData: DataNode[] = [
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true }
]

const AntdTree = () => {
  const [lazyTreeData, setLazyTreeData] = useState(initTreeData)

  function handleLoadData(treeNode: any) {
    return new Promise<void>(resolve => {
      if (treeNode.dataRef.children) {
        resolve()
        return
      }
      setTimeout(() => {
        treeNode.dataRef.children = [
          { title: 'Child Node', key: `${treeNode.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.eventKey}-1` }
        ]
        setLazyTreeData([...lazyTreeData])
        resolve()
      }, 1000)
    })
  }

  function handleDrop() {}

  return (
    <PageWrapper plugin={TREE_COMPO}>
      <Row gutter={12}>
        <Col span={8}>
          <Card title='可选择节点' bordered={false} bodyStyle={{ height: '420px' }}>
            <Tree treeData={treeData} checkable defaultExpandAll />
          </Card>
        </Col>
        <Col span={8}>
          <Card title='懒加载节点' bordered={false} bodyStyle={{ height: '420px' }}>
            <Tree checkable treeData={lazyTreeData} loadData={handleLoadData} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title='可拖拽节点' bordered={false} bodyStyle={{ height: '420px' }}>
            <Tree treeData={treeData} draggable blockNode defaultExpandAll onDrop={handleDrop} />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default AntdTree
