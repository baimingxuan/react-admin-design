import SvgIcon from '@/components/SvgIcon'

export default function MenuItemCont(props: any) {

  return (
    <span className='compo_menu-item-cont'>
      { props.item?.icon ? <SvgIcon name={props.item?.icon} size={16} /> : null }
      <span>{ props.item?.name }</span>
    </span>
  )
}