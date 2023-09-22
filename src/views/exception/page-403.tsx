import { FC } from 'react'
import { Result, Card , Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page403: FC = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/home')
  }

  return (
    <Card bordered={false}>
      <Result
        status='403'
        title='403'
        subTitle='对不起，您没有权限访问此页面。'
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

export default Page403