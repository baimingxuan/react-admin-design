import { lazy } from '@loadable/component'
import type { RouteObject } from '../types'
import { LayoutGuard } from '../guard'
import { LazyLoad } from '@/components/LazyLoad'

// information module page
const ProjectRoute: RouteObject = {
    path: '/project-list',
    name: 'ProjectList',
    element: <LayoutGuard />,
    meta: {
        title: '项目推荐管理',
        icon: 'tree',
        orderNo: 6,
        hideChildrenInMenu: true
    },
    children: [
        {
            path: '',
            name: 'ProjectList',
            element: LazyLoad(lazy(() => import('@/views/project/project-list'))),
            meta: {
                title: '项目列表',
                key: 'project-list'
            }
        }
    ]
}

export default ProjectRoute