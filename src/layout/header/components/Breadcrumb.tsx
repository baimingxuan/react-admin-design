import { Breadcrumb } from 'antd'
import SvgIcon from '@/components/SvgIcon'

export default function LayoutBreadcrumb() {
  const items = [{}]

  return (
    <div
      className='flex-center-v'
      style={{padding: '0 16px'}}
    >
      <Breadcrumb items={items} />
    </div>
  )
}
