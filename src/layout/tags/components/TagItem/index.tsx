import type { FC } from 'react'
import { Tag } from 'antd'
import classNames from 'classnames'
import styles from './index.module.less'

interface PropState {
  name: string
  fixed?: boolean
  active?: boolean
  closeTag: () => void
  onClick: () => void
}

const TagItem: FC<PropState> = ({ name, fixed, active, closeTag, onClick }) => {
  return (
    <Tag
      className={classNames(styles['compo_tag-item'], { [styles['active']]: active })}
      closable={!fixed}
      onClose={closeTag}
      onClick={onClick}
    >
      <span className={styles['compo_tag-item__dot']} />
      <span className={styles['compo_tag-item__name']}>{name}</span>
    </Tag>
  )
}

export default TagItem
