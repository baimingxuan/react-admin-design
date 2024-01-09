import type { FC } from 'react'
import { Space } from 'antd'
import { useAppSelector } from '@/stores'
import classNames from 'classnames'
import styles from './app-logo.module.less'
import logoImg from '@/assets/images/logo.png'
import logoName from '@/assets/images/name_white.png'

const AppLogo: FC = () => {
  const getMenuFold = useAppSelector(state => state.app.appConfig?.menuSetting?.menuFold)

  return (
    <div className={classNames('anticon', styles['app-logo'])}>
      <Space>
        <img className={styles['logo-img']} src={logoImg} alt='logo' />
        <img
          className={classNames(styles['logo-name'], { [styles['hidden']]: getMenuFold })}
          src={logoName}
          alt='logo'
        />
      </Space>
    </div>
  )
}

export default AppLogo
