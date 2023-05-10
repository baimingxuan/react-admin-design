import { AppRoute } from '../types'
import { BasicLayout } from '../../layout'
import Home from '../../views/home'

// image module page
const ImageRoute: AppRoute = {
    path: '/image',
    element: <BasicLayout />,
    meta: {
        title: '图片处理',
        icon: 'image',
        orderNo: 4
    },
    children: [
        {
            path: 'image-cropper',
            element: <Home />,
            meta: {
                title: '图片裁剪'
            }
        },
        {
            path: 'image-compress',
            element: <Home />,
            meta: {
                title: '图片压缩'
            }
        },
        {
            path: 'image-composition',
            element: <Home />,
            meta: {
                title: '图片合成'
            }
        }
    ]
}

export default ImageRoute