import type { FC, ReactNode } from 'react'
import { Result, Card, Button } from 'antd'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { ExceptionEnum } from '@/enums/exceptionEnum'

const subTitleMap = new Map([
  [ExceptionEnum.PAGE_NOT_ACCESS, '对不起，您没有权限访问此页面。'],
  [ExceptionEnum.PAGE_NOT_FOUND, '对不起，您访问的页面不存在。'],
  [ExceptionEnum.SERVER_ERROR, '对不起，服务器发生错误。']
])

const PageException: FC = () => {
  const navigate = useNavigate()

  const { status, withCard } = useLoaderData() as { status: any; withCard: boolean }

  const goHome = () => {
    navigate('/home')
  }

  const WithCard = ({ children }: { children: ReactNode }) => {
    if (withCard) {
      return (
        <Card bordered={false}>{children}</Card>
      )
    } else {
      return (
        <div className='flex-center' style={{ height: '100vh' }}>
          {children}
        </div>
      )
    }
  }

  return (
    <WithCard>
      <Result
        status={status}
        title={status}
        subTitle={subTitleMap.get(status)}
        extra={
          <Button type='primary' onClick={goHome}>
            返回首页
          </Button>
        }
      />
    </WithCard>
  )
}

export default PageException
