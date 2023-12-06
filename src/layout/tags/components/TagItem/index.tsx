import { FC } from 'react'
import { Tag } from 'antd'
import classNames from 'classnames'
import styles from './index.module.less'

interface PropState {
  name: string
  fixed?: boolean
  active?: boolean
  closeTag: () => void
}

const TagItem: FC<PropState> = ({ name, fixed, active, closeTag }) => {
  return (
    <Tag className={classNames(styles['compo_tag-item'], { active })} closable={!fixed} onClose={closeTag}>
      <span className={styles['compo_tag-item__dot']} />
      <span className={styles['compo_tag-item__name']}>{name}</span>
    </Tag>
  )
}

export default TagItem
