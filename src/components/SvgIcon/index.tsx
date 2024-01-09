import type { SvgIconProp } from './types'
import styles from './index.module.less'

export default function SvgIcon({ name, prefix = 'icon', size = 16, style }: SvgIconProp) {
  const symbolId = `#${prefix}-${name}`
  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
    ...style
  }

  return (
    <svg className={styles['svg-icon']} style={iconStyle} aria-hidden='true'>
      <use href={symbolId} />
    </svg>
  )
}
