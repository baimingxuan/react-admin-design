import { useEffect } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import LayoutMenu from './menu'

export const BasicLayout = (props: any) => {
  const { Sider, Content } = Layout

  return (
    <Layout className='layout_wrapper'>
      <Sider>
        <LayoutMenu />
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}