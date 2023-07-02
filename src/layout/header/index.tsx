import { Layout } from 'antd'
import LayoutFeature from '../feature'

const LayoutHeader = (props: any) => {
  const { Header } = Layout

  return (
    <Header
      className='flex-between-h'
      style={{
        flexDirection: 'column',
        height: 'auto',
        background: '#fff'
      }}
    >
      <div
        className='flex-between-h'
        style={{padding: '0 12px'}}
      >
        <div className='flex-center-v'>

        </div>
        <LayoutFeature />
      </div>
    </Header>
  )
}

export default LayoutHeader