import SvgIcon from '@/components/SvgIcon'
import style from './index.module.less'

export default function FoldTrigger() {
  function toggledMenuFold() {}
  
  return (
    <span
      className={
        style['compo_fold-trigger']
      }
      onClick={toggledMenuFold}
    >
      <SvgIcon name='unfold' size={20} />
    </span>
  )
}