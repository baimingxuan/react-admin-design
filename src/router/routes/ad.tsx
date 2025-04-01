import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// information module page
const TextEditorRoute: RouteObject = {
    path: '/ad-list',
    name: 'AdList',
    element: <LayoutGuard />,
    meta: {
        title: '广告管理',
        icon: 'editor',
        orderNo: 5,
        hideChildrenInMenu: true
    },
    children: [
        {
            path: '',
            name: 'AdList',
            element: LazyLoad(lazy(() => import('@/views/ad/ad-list'))),
            meta: {
                title: '广告列表',
                key: 'ad-list'
            }
        }
    ]
}

export default TextEditorRoute