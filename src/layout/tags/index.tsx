import type { MenuProps } from 'antd'
import type { RouteObject } from '@/router/types'
import { type FC, type WheelEvent, useState, useEffect, useRef } from 'react'
import { Button, Dropdown } from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  ExpandOutlined,
  CompressOutlined,
  CloseOutlined,
  RedoOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFullscreen } from 'ahooks'
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

  const tagsMain = useRef<ElRef>(null)
  const tagsMainCont = useRef<ElRef>(null)

  const [canMove, setCanMove] = useState(false)
  const [tagsContLeft, setTagsContLeft] = useState(0)
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.querySelector('#mainCont')!)

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

  useEffect(() => {
    const tagNodeList = tagsMainCont.current?.childNodes as unknown as Array<HTMLElement>
    const activeTagNode = Array.from(tagNodeList).find(item => item.dataset.path === activeTag)!

    moveToActiveTag(activeTagNode)
  }, [activeTag])

  useEffect(() => {
    const mainWidth = tagsMain.current?.offsetWidth!
    const mainContWidth = tagsMainCont.current?.offsetWidth!

    if (mainContWidth > mainWidth) {
      setCanMove(true)
    } else {
      setCanMove(false)
    }
  }, [visitedTags.length])

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

  const moveToActiveTag = (tag: any) => {
    let leftOffset: number = 0
    const mainContPadding = 4
    const mainWidth = tagsMain.current?.offsetWidth!
    const mainContWidth = tagsMainCont.current?.offsetWidth!

    if (mainContWidth < mainWidth) {
      leftOffset = 0
    } else if (tag?.offsetLeft! < -tagsContLeft) {
      // 标签在可视区域左侧 (The active tag on the left side of the layout_tags-main)
      leftOffset = -tag?.offsetLeft! + mainContPadding
    } else if (tag?.offsetLeft! > -tagsContLeft && tag?.offsetLeft! + tag?.offsetWidth! < -tagsContLeft + mainWidth) {
      // 标签在可视区域 (The active tag on the layout_tags-main)
      leftOffset = Math.min(0, mainWidth - tag?.offsetWidth! - tag?.offsetLeft! - mainContPadding)
    } else {
      // 标签在可视区域右侧 (The active tag on the right side of the layout_tags-main)
      leftOffset = -(tag?.offsetLeft! - (mainWidth - mainContPadding - tag?.offsetWidth!))
    }
    setTagsContLeft(leftOffset)
  }

  const handleMove = (offset: number) => {
    let leftOffset: number = 0
    const mainWidth = tagsMain.current?.offsetWidth!
    const mainContWidth = tagsMainCont.current?.offsetWidth!

    if (offset > 0) {
      leftOffset = Math.min(0, tagsContLeft + offset)
    } else {
      if (mainWidth < mainContWidth) {
        if (tagsContLeft >= -(mainContWidth - mainWidth)) {
          leftOffset = Math.max(tagsContLeft + offset, mainWidth - mainContWidth)
        }
      } else {
        leftOffset = 0
      }
    }
    setTagsContLeft(leftOffset)
  }

  const handleScroll = (e: WheelEvent) => {
    const type = e.type
    let distance: number = 0

    if (type === 'wheel') {
      distance = e.deltaY ? e.deltaY * 2 : -(e.detail || 0) * 2
    }

    handleMove(distance)
  }

  const handleCloseTag = (path: string) => {
    // @ts-ignore
    dispatch(closeTagByKey(path)).then(({ payload }) => {
      let currTag: RouteObject
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
  const getKey = () => {
    return new Date().getTime().toString()
  }
  const handleReload = () => {
    // 刷新当前路由，页面不刷新
    const index = visitedTags.findIndex(tab => tab.fullPath === activeTag)
    if (index >= 0) {
      // 这个是react的特性，key变了，组件会卸载重新渲染
      navigate(activeTag, { replace: true, state: { key: getKey() } })
    }
  }
  return (
    <div className={styles['layout_tags']}>
      <Button
        className={styles['layout_tags__btn']}
        icon={<LeftOutlined />}
        size='small'
        disabled={!canMove}
        onClick={() => handleMove(200)}
      />
      <div ref={tagsMain} className={styles['layout_tags__main']} onWheel={handleScroll}>
        <div ref={tagsMainCont} className={styles['layout_tags__main-cont']} style={{ left: tagsContLeft + 'px' }}>
          {visitedTags.map((item: RouteObject) => (
            <span key={item.fullPath} data-path={item.fullPath}>
              <TagItem
                name={item.meta?.title!}
                active={activeTag === item.fullPath}
                fixed={item.meta?.affix}
                onClick={() => handleClickTag(item.fullPath!)}
                closeTag={() => handleCloseTag(item.fullPath!)}
              />
            </span>
          ))}
        </div>
      </div>
      <Button
        className={styles['layout_tags__btn']}
        icon={<RightOutlined />}
        size='small'
        disabled={!canMove}
        onClick={() => handleMove(-200)}
      />
      <Button
        className={classNames(styles['layout_tags__btn'], styles['layout_tags__btn-space'])}
        icon={isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
        size='small'
        onClick={() => toggleFullscreen()}
      />
      <Button
        className={classNames(`${styles.layout_tags}__btn`, `${styles.layout_tags}__btn-space`)}
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
