import type { FormInstance } from 'antd/es/form'
import { FC, useRef, useState } from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import logoIcon from '@/assets/images/logo2.png'
import './index.less'

const LoginPage: FC = () => {
  const [form] = Form.useForm()
  const loginFormRef = useRef<FormInstance>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = (values: any) => {
    console.log('values', values)
    setLoading(true)
    try {
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    } catch (error) {
      message.error((error as unknown as Error).message)
    } finally {
      // setLoading(false)
    }
  }

  return (
    <div className='login-wrapper'>
      <div className='login-box'>
        <div className='login-box-title'>
          <img src={logoIcon} alt='icon' />
          <p>账 号 登 录</p>
        </div>
        <Form
          ref={loginFormRef}
          form={form}
          initialValues={{
            username: 'admin',
            password: '123456',
            remember: true
          }}
          className='login-box-form'
          onFinish={handleLogin}
        >
          <Form.Item name='username' rules={[{ required: true, message: '请输入账号' }]}>
            <Input
              placeholder='请输入账号'
              prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} rev={undefined} />}
            />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input
              type='password'
              placeholder='请输入密码'
              prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} rev={undefined} />}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name='remember' className='fl' valuePropName='checked'>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item className='fr'>
              <a href=''>忘记密码？</a>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-btn'
              loading={loading}
            >登 录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage