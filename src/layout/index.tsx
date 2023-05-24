import { useEffect } from 'react'
import { Layout } from 'antd'
import LayoutMenu from './menu'

export const BasicLayout = (props: any) => {
  const { Sider, Content } = Layout

  return (
    <Layout className='layout_wrapper'>
      <Sider>
        <LayoutMenu />
      </Sider>
      <Content />
    </Layout>
  )
}