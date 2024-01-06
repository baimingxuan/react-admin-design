import React, { useState } from 'react'
import { Row, Col, Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { cloneDeep } from 'lodash-es'
import { SORTABLE_PLUGIN } from '@/settings/websiteSetting'
import { ReactSortable } from 'react-sortablejs'

interface ItemState {
  id: number
  name: string
}

const DragList: React.FC = () => {
  const [listOne, setListOne] = useState<ItemState[]>([
    { name: 'ECMAScript6', id: 1 },
    { name: 'VueJS', id: 2 },
    { name: 'ReactJS', id: 3 },
    { name: 'AngularJS', id: 4 },
    { name: 'Webpack', id: 5 }
  ])
  const [listTwo, setListTwo] = useState<ItemState[]>([
    { name: 'NodeJS', id: 6 },
    { name: 'TypeScript', id: 7 }
  ])

  const [dragLogs, setDragLogs] = useState<string[]>(['列表1 => 列表2, 6 => 1', '列表1 => 列表2, 6 => 2'])

  const handleDrop = (event: any) => {
    const listMap = new Map([
      ['list1', '列表1'],
      ['list2', '列表2']
    ])
    const fromClsName = event.from.className
    const toClsName = event.to.className
    const from = listMap.get(fromClsName)
    const to = listMap.get(toClsName)
    const newDrapLogs = cloneDeep(dragLogs)
    newDrapLogs.push(`${from} => ${to}, ${event.oldIndex + 1} => ${event.newIndex + 1}`)
    setDragLogs(newDrapLogs)
  }

  return (
    <PageWrapper plugin={SORTABLE_PLUGIN}>
      <Row gutter={12}>
        <Col span={5}>
          <Card title='列表1事项' bordered={false} bodyStyle={{ height: '520px' }}>
            <ReactSortable
              list={listOne}
              setList={setListOne}
              onEnd={handleDrop}
              group='list'
              className='list1'
              style={{ height: '100%' }}
            >
              {listOne.map(item => (
                <Card key={item.id} hoverable size='small' style={{ marginBottom: '12px' }}>
                  {item.name}
                </Card>
              ))}
            </ReactSortable>
          </Card>
        </Col>
        <Col span={5}>
          <Card title='列表2事项' bordered={false} bodyStyle={{ height: '520px' }}>
            <ReactSortable
              list={listTwo}
              setList={setListTwo}
              onEnd={handleDrop}
              group='list'
              className='list2'
              style={{ height: '100%' }}
            >
              {listTwo.map(item => (
                <Card key={item.id} hoverable size='small' style={{ marginBottom: '12px' }}>
                  {item.name}
                </Card>
              ))}
            </ReactSortable>
          </Card>
        </Col>
        <Col span={4}>
          <Card title='操作记录' bordered={false} bodyStyle={{ height: '520px' }}>
            {dragLogs.map(item => {
              return (
                <p key={item} style={{ marginBottom: '8px' }}>
                  {item}
                </p>
              )
            })}
          </Card>
        </Col>
        <Col span={5}>
          <Card title='列表1数据' bordered={false} bodyStyle={{ height: '520px' }}>
            <pre>
              {JSON.stringify(
                listOne.map(({ name, id }) => ({ name, id })),
                null,
                2
              )}
            </pre>
          </Card>
        </Col>
        <Col span={5}>
          <Card title='列表2数据' bordered={false} bodyStyle={{ height: '520px' }}>
            <pre>
              {JSON.stringify(
                listTwo.map(({ name, id }) => ({ name, id })),
                null,
                2
              )}
            </pre>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default DragList
