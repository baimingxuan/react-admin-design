import { FC } from 'react'
import { Result, Card , Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page404: FC = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/home')
  }

  return (
    <Card bordered={false}>
      <Result
        status='404'
        title='404'
        subTitle='对不起，您访问的页面不存在。'
        extra={
          <Button
            type='primary'
            onClick={goHome}
          >
            返回首页
          </Button>
        }
      />
    </Card>
  )
}

export default Page404