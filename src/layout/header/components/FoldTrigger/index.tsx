import { useAppSelector, useAppDispatch } from '@/stores'
import { setAppConfig } from '@/stores/modules/app'
import SvgIcon from '@/components/SvgIcon'
import style from './index.module.less'
import classNames from 'classnames'

export default function FoldTrigger() {
  const getMenuFold = useAppSelector(state => state.app.appConfig?.menuSetting?.menuFold)
  const dispatch = useAppDispatch()

  function toggledMenuFold() {
    dispatch(setAppConfig({ menuSetting: { menuFold: !getMenuFold } }))
  }

  return (
    <span
      className={classNames(style['compo_fold-trigger'], { [style['unfold']]: !getMenuFold })}
      onClick={toggledMenuFold}
    >
      <SvgIcon name='unfold' size={20} />
    </span>
  )
}
