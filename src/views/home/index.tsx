import { FC, useState } from 'react'
import { Row, Col, Space } from 'antd'
import { countUpData } from './data'
import CountUpCard from './components/CountUpCard'
import ChartsBar from './components/ChartsBar'

const HomePage: FC = () => {
	const [isLoading, setIsLoading] = useState(true)

	setTimeout(() => {
		setIsLoading(false)
	}, 1500)

	return (
		<Space direction='vertical' size={12} style={{ display: 'flex' }}>
			<Row gutter={12}>
				{
					countUpData.map(item => {
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
					})
				}
			</Row>
			<Row gutter={12}>
          <Col span={12}>
            <ChartsBar loading={isLoading} />
          </Col>
          <Col span={12}>
            {/* <ChartsLine loading={unref(isLoading)} /> */}
          </Col>
        </Row>
		</Space>
	)
}

export default HomePage