import React, { useState } from 'react'
import { Menu, Spin } from 'antd'

const LayoutMenu = (props: any) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className='layout_menu'>
      <Spin spinning={loading} tip='Loading...'>
        <Menu
          theme='dark'
          mode='inline'
        />
      </Spin>
    </div>
  )
}