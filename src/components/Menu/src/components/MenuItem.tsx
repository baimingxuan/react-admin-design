import { Menu } from 'antd'
import MenuItemCont from './MenuItemCont'

export default function MenuItem(props: any) {

  return (
    <Menu.Item key={props.item.path}>
      <MenuItemCont item={props.item} />
    </Menu.Item>
  )
}