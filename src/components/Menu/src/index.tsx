import { Menu } from 'antd'
import SubMenuItem from './components/SubMenuItem'

export default function BasicMenu(props: any) {

  return (
    <Menu theme='dark' mode='inline' triggerSubMenuAction='click'>
      { props.items.map((item: any) => <SubMenuItem item={props.item} key={item.path} />) }
    </Menu>
  )
}