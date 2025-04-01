import { type FC, useState } from 'react'
import { Row, Col, Space } from 'antd'
import CountUpCard from './components/CountUpCard'
import ChartsCard from './components/ChartsCard'
import { countUpData, ringOptions, lineOptions } from './data'
import TableBasic from './components/table-basic'

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, 1500)

  return (
    <Space direction='vertical' size={12} style={{ display: 'flex' }}>
      <Row gutter={12}>
        {countUpData.map(item => {
          return (
            <Col flex={1} key={item.title}>
              <CountUpCard
                loading={isLoading}
                title={item.title}
                color={item.color}
                iconName={item.icon}
                countNum={item.count}
              />
            </Col>
          )
        })}
      </Row>
      <Row gutter={12}>
        <Col span={16}>
          <ChartsCard loading={isLoading} options={lineOptions} height={300} />
        </Col>
        <Col span={8}>
          <ChartsCard loading={isLoading} options={ringOptions} height={300} />
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={24}>
          <TableBasic />
        </Col>
      </Row>
    </Space>
  )
}

export default HomePage
