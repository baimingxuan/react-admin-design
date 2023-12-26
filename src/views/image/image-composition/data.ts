import type { ImageElementState, TextElementState, ContainerState } from './types'
import { COMPOSITION_IMG_SRC, COMPOSITION_IMG_SRC2 } from '@/settings/websiteSetting'

export const textElement: TextElementState = {
  x: 300,
  y: 100,
  z: 1,
  w: 180,
  h: 36,
  type: 'text',
  tag: 'text_1',
  active: false,
  text: '请输入文本',
  style: {
    textAlign: 'left',
    fontSize: '24px',
    fontFamily: '微软雅黑',
    fontWeight: 400,
    color: '#f70707',
    backgroundColor: '#05f8e8'
  }
}

export const imageElement: ImageElementState = {
  x: 320,
  y: 300,
  z: 2,
  w: 160,
  h: 160,
  type: 'image',
  tag: 'image_2',
  active: false,
  url: COMPOSITION_IMG_SRC2
}

export const containerObj: ContainerState = {
  width: 850,
  height: 530,
  bgImgUrl: COMPOSITION_IMG_SRC
}
