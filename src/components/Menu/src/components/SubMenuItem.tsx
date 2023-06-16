import { Menu } from 'antd'
import MenuItem from './MenuItem'
import MenuItemCont from './MenuItemCont'

export default function SubMenuItem(props: any) {
  function menuHasChildren(menuTreeItem: any): boolean {
    return (
      !menuTreeItem?.hideChildrenInMenu &&
      Reflect.has(menuTreeItem, 'children') &&
      !!menuTreeItem.children &&
      menuTreeItem.children.length > 0
    )
  } 

  return (
   <>
    { (!menuHasChildren(props.item) && !props.item?.hideMenu) ? <MenuItem item={props.item} /> : null }
    { 
      (menuHasChildren(props.item) && !props.item?.hideMenu)
      ? (
          <Menu.SubMenu key={props.item.path}>
            <MenuItemCont item={props.item} />
            {
              props.item.children.map((cItem: any) => <SubMenuItem item={cItem} />)
            }
          </Menu.SubMenu>
        )
      : null }
   </>
  )
}