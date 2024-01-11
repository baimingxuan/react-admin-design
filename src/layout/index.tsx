import { Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import LayoutMenu from './menu'
import LayoutHeader from './header'
import LayoutTags from './tags'
import { AppLogo } from '@/components/AppLogo'
import './index.less'
import { useTitle } from '@/hooks/web/useTitle'
import { useAppSelector } from '@/stores'

export const BasicLayout = () => {
  useTitle()
  const { Sider, Content } = Layout
  const { state } = useLocation()
  const { key = 'key' } = state || {}
  const getMenuFold = useAppSelector(st => st.app.appConfig?.menuSetting?.menuFold)

  return (
    <Layout className='layout_wrapper'>
      <Sider width={210} trigger={null} collapsed={getMenuFold} style={{ height: '100vh' }}>
        <AppLogo />
        <LayoutMenu />
      </Sider>
      <Layout>
        <LayoutHeader />
        <Layout id='mainCont'>
          <LayoutTags />
          <Content>
            <Outlet key={key} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
