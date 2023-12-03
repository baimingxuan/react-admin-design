import { useAppSelector, useAppDispatch } from '@/stores'
import { setAppConfig } from '@/stores/modules/appSlice'
import SvgIcon from '@/components/SvgIcon'
import style from './index.module.less'

export default function FoldTrigger() {
  const getMenuFold = useAppSelector(state => state.app.appConfig?.menuSetting?.menuFold)
  const dispatch = useAppDispatch()

  function toggledMenuFold() {
    dispatch(setAppConfig({ menuSetting: { menuFold: !getMenuFold } }))
  }

  return (
    <span className={style['compo_fold-trigger']} onClick={toggledMenuFold}>
      <SvgIcon name='unfold' size={20} />
    </span>
  )
}
