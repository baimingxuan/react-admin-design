import { FC } from 'react'
import { Result, Card , Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Page500: FC = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/home')
  }

  return (
    <Card bordered={false}>
      <Result
        status='500'
        title='500'
        subTitle='对不起，服务器发生错误。'
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

export default Page500