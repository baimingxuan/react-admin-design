import type { MenuProps } from 'antd'
import { FC } from 'react'
import { Button, Dropdown } from 'antd'
import { LeftOutlined, RightOutlined, RedoOutlined, CloseOutlined } from '@ant-design/icons'
import { TagItem } from './components'
import { basicRoutes } from '@/router'
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

  const tagsList = [{ title: '首页', path: '/home' }]

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
          {tagsList.map(item => (
            <span key={item.path}>
              <TagItem name={item.title} closeTag={() => handleCloseTag.bind(item.path)} />
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
