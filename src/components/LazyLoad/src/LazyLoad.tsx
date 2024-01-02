import { ReactNode, Suspense, LazyExoticComponent } from 'react'
import { Spin } from 'antd'
import { LoadableComponent } from '@loadable/component'

/**
 * @description 路由懒加载
 * @param {Element} Component 需要访问的组件
 * @returns element
 */
const LazyLoad = (Component: LoadableComponent<any>): ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size='large'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        />
      }
    >
      <Component />
    </Suspense>
  )
}

export default LazyLoad
