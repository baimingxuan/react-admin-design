import { RouteObject } from '../types'
import { BasicLayout } from '../../layout'
import BlankPage from '@/views/blank'
import BasicForm from '@/views/form/basic-form'

// form module page
const FormRoute: RouteObject = {
  path: '/form',
  element: <BasicLayout />,
  meta: {
    title: '表单',
    icon: 'form',
    orderNo: 2
  },
  children: [
    {
      path: 'basic-form',
      element: <BasicForm />,
      meta: {
        title: '基础表单',
        key: 'basicForm'
      }
    },
    {
      path: 'form-designer',
      element: <BlankPage />,
      meta: {
        title: '表单设计器',
        key: 'formDesigner'
      }
    }
  ]
}

export default FormRoute
