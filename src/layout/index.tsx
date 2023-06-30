import { useEffect } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import LayoutMenu from './menu'
import style from './index.module.less'

export const BasicLayout = (props: any) => {
  const { Sider, Content } = Layout

  return (
    <Layout className={style['layout_wrapper']}>
      <Sider width={210} style={{height: '100vh'}}>
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