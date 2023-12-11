import type { MenuProps } from 'antd'
import type { RouteObject } from '@/router/types'
import { FC, useEffect } from 'react'
import { Button, Dropdown } from 'antd'
import { LeftOutlined, RightOutlined, RedoOutlined, CloseOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { TagItem } from './components'
import { basicRoutes } from '@/router'
import { useAppSelector, useAppDispatch } from '@/stores'
import { addVisitedTags } from '@/stores/modules/tags'
import { searchRoute } from '@/utils'
import classNames from 'classnames'
import styles from './index.module.less'

const LayoutTags: FC = () => {
  const items: MenuProps['items'] = [
    { key: 'left', label: '关闭左侧' },
    { key: 'right', label: '关闭右侧' },
    { key: 'other', label: '关闭其它' },
    { key: 'all', label: '关闭所有' }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'left':
        handleClose()
        break
      case 'right':
        handleClose()
        break
    }
  }

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const visitedTags = useAppSelector(state => state.tags.visitedTags)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const affixTags = initAffixTags(basicRoutes)
    for (const tag of affixTags) {
      dispatch(addVisitedTags(tag))
    }
  }, [])

  useEffect(() => {
    const currRoute = searchRoute(pathname, basicRoutes)
    if (currRoute) {
      dispatch(addVisitedTags(currRoute))
    }
  }, [pathname])

  const initAffixTags = (routes: RouteObject[], basePath: string = '/') => {
    let affixTags: RouteObject[] = []

    for (const route of routes) {
      if (route.meta?.affix) {
        const fullPath = route.path!.startsWith('/') ? route.path : basePath + route.path
        affixTags.push({
          ...route,
          path: fullPath
        })
      }
      if (route.children && route.children.length) {
        affixTags = affixTags.concat(initAffixTags(route.children, route.path))
      }
    }

    return affixTags
  }

  const handleMove = (offset: number) => {}

  const handleScroll = (e: any) => {}

  const handleCloseTag = (targetKey: string) => {}

  const handleReload = () => {}

  const handleClose = () => {}

  return (
    <div className={styles['layout_tags']}>
      <Button
        className={styles['layout_tags__btn']}
        icon={<LeftOutlined />}
        size='small'
        onClick={() => handleMove(240)}
      />
      <div className={styles['layout_tags__main']}>
        <div className={styles['layout_tags__main-body']}>
          {visitedTags.map((item: RouteObject) => (
            <span key={item.fullPath}>
              <TagItem
                name={item.meta?.title!}
                active={pathname === item.fullPath}
                closeTag={() => handleCloseTag.bind(item.path)}
                onClick={() => navigate(item.fullPath!)}
              />
            </span>
          ))}
        </div>
      </div>
      <Button
        className={styles['layout_tags__btn']}
        icon={<RightOutlined />}
        size='small'
        onClick={() => handleMove(-240)}
      />
      <Button
        className={classNames(styles['layout_tags__btn'], styles['layout_tags__btn-space'])}
        icon={<RedoOutlined />}
        size='small'
        onClick={() => handleReload()}
      />
      <Dropdown menu={{ items, onClick }} placement='bottomLeft'>
        <Button
          className={classNames(styles['layout_tags__btn'], styles['layout_tags__btn-space'])}
          icon={<CloseOutlined />}
          size='small'
        />
      </Dropdown>
    </div>
  )
}

export default LayoutTags
