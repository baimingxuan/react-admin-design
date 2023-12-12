import type { MenuProps } from 'antd'
import type { RouteObject } from '@/router/types'
import { FC, useState, useEffect } from 'react'
import { Button, Dropdown } from 'antd'
import { LeftOutlined, RightOutlined, RedoOutlined, CloseOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { TagItem } from './components'
import { basicRoutes } from '@/router'
import { useAppSelector, useAppDispatch } from '@/stores'
import { addVisitedTags } from '@/stores/modules/tags'
import { searchRoute } from '@/utils'
import { closeAllTags, closeTagByKey, closeTagsByType } from '@/stores/modules/tags'
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
    if (key === 'all') {
      // @ts-ignore
      dispatch(closeAllTags()).then(({ payload }) => {
        const lastTag = payload.slice(-1)[0]
        if (activeTag !== lastTag?.fullPath) {
          navigate(lastTag?.fullPath)
        }
      })
    } else {
      dispatch(closeTagsByType({ type: key, path: activeTag }))
    }
  }

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const visitedTags = useAppSelector(state => state.tags.visitedTags)
  const dispatch = useAppDispatch()

  const [activeTag, setActiveTag] = useState(pathname)

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
    setActiveTag(pathname)
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

  const handleCloseTag = (path: string) => {
    // @ts-ignore
    dispatch(closeTagByKey(path)).then(({ payload }) => {
      let currTag: RouteObject = {}
      const { tagIndex, tagsList } = payload
      const tagLen = tagsList.length
      if (path === activeTag) {
        if (tagIndex <= tagLen - 1) {
          currTag = tagsList[tagIndex]
        } else {
          currTag = tagsList[tagLen - 1]
        }
        navigate(currTag?.fullPath!)
      }
    })
  }

  const handleClickTag = (path: string) => {
    setActiveTag(path)
    navigate(path)
  }

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
                active={activeTag === item.fullPath}
                fixed={item.meta?.affix}
                closeTag={() => handleCloseTag(item.fullPath!)}
                onClick={() => handleClickTag(item.fullPath!)}
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
