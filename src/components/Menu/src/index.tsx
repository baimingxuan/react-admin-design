import { Menu } from 'antd'
import SubMenuItem from './components/SubMenuItem'

export default function BasicMenu(props: any) {
  console.log('props.items', props.items)

  return (
    <Menu theme='dark' mode='inline' triggerSubMenuAction='click'>
      { props.items.map((item: any) => <SubMenuItem item={item} key={item.key} />) }
    </Menu>
  )
}