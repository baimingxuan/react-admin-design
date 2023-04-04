import { useEffect } from 'react'
import { Layout } from 'antd'

export const BasicLayout = (props: any) => {
  const { Sider, Content } = Layout

  return (
    <Layout className='layout_wrapper'>
      <Sider />
      <Content />
    </Layout>
  )
}