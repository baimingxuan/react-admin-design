import { Result, Card , Button } from 'antd'
import { ExceptionEnum } from '@/enums/exceptionEnum'

interface MapValue {
  status: string
  title: string
  subTitle: string
  btnText?: string
  handler?: Fn
}

const PageException = (props: any) => {
  const statusMap = new Map<string | number, MapValue>()

  statusMap.set(ExceptionEnum.PAGE_NOT_ACCESS, {
    status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
    title: '403',
    subTitle: '对不起，您没有权限访问此页面。',
    btnText: '返回首页',
    handler: () => '/'
  })

  statusMap.set(ExceptionEnum.PAGE_NOT_FOUND, {
    status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
    title: '404',
    subTitle: '对不起，您访问的页面不存在。',
    btnText: '返回首页',
    handler: () => '/'
  })

  statusMap.set(ExceptionEnum.SERVER_ERROR, {
    status: `${ExceptionEnum.SERVER_ERROR}`,
    title: '500',
    subTitle: '对不起，服务器发生错误。',
    btnText: '返回首页',
    handler: () => '/'
  })

  const { status, title, subTitle, btnText, handler } = {} as MapValue

  return (
    <Card bordered={false}>
      <Result
        status={status as any}
        title={title}
        subTitle={subTitle}
        extra={
          btnText &&
          (
            <Button
              type='primary'
              onClick={handler}
            >
              {btnText}
            </Button>
          )
        }
      />
    </Card>
  )
}

export default PageException