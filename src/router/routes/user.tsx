import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'
import { ExceptionEnum } from '@/enums/exceptionEnum'

// information module page
const TextEditorRoute: RouteObject = {
    path: '/user',
    name: 'User',
    element: <LayoutGuard />,
    meta: {
        title: '用户管理',
        icon: 'tree',
        orderNo: 4
    },
    children: [
        {
            path: 'list',
            name: 'List',
            element: LazyLoad(lazy(() => import('@/views/exception'))),
            loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
            meta: {
                title: '用户列表',
                key: 'user-list'
            }
        },
        {
            path: 'label',
            name: 'Label',
            element: LazyLoad(lazy(() => import('@/views/exception'))),
            loader: () => ({ status: ExceptionEnum.PAGE_NOT_FOUND, withCard: true }),
            meta: {
                title: '用户标签',
                key: 'user-label'
            }
        }
    ]
}

export default TextEditorRoute
