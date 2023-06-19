import { Menu } from 'antd'
import MenuItemCont from './MenuItemCont'
import SvgIcon from '@/components/SvgIcon'

export default function MenuItem(props: any) {

  return (
    <Menu.Item
      key={props.item.path}
      icon={
        props.item?.icon
        ? <SvgIcon name={props.item?.icon} size={16} />
        : null
      }
    >
      <span>{ props.item?.name }</span>
    </Menu.Item>
  )
}