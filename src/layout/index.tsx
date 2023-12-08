import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import LayoutMenu from './menu'
import LayoutHeader from './header'
import { AppLogo } from '@/components/AppLogo'
import './index.less'
import { useTitle } from '@/hooks/web/useTitle'
import { useAppSelector } from '@/stores'

export const BasicLayout = (props: any) => {
  useTitle()
  const { Sider, Content } = Layout

  const getMenuFold = useAppSelector(state => state.app.appConfig?.menuSetting?.menuFold)

  return (
    <Layout className='layout_wrapper'>
      <Sider width={210} trigger={null} collapsed={getMenuFold} style={{ height: '100vh' }}>
        <AppLogo />
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
