import React, { useRef, useEffect, useState } from 'react'
import { type SlateDescendant, type IEditorConfig, createEditor, type IDomEditor } from '@wangeditor/editor'

interface IProps {
  defaultContent?: SlateDescendant[]
  onCreated?: (editor: IDomEditor) => void
  defaultHtml?: string
  value?: string
  onChange: (editor: IDomEditor) => void
  defaultConfig: Partial<IEditorConfig>
  mode?: string
  style?: React.CSSProperties
  className?: string
}

function EditorComponent(props: Partial<IProps>) {
  const {
    defaultContent = [],
    onCreated,
    defaultHtml = '',
    value = '',
    onChange,
    defaultConfig = {},
    mode = 'default',
    style = {},
    className
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [curValue, setCurValue] = useState('')

  const handleCreated = (editor: IDomEditor) => {
    // Component attr onCreated。(组件属性 onCreated)
    if (onCreated) onCreated(editor)

    // Editor config onCreate。(编辑器 配置 onCreated)
    const { onCreated: onCreatedFromConfig } = defaultConfig
    if (onCreatedFromConfig) onCreatedFromConfig(editor)
  }

  const handleChanged = (editor: IDomEditor) => {
    // Records the current html value。(记录当前 html 值)
    setCurValue(editor.getHtml())

    // Component attr onChange。(组件属性 onChange)
    if (onChange) onChange(editor)

    // Editor config onChange。(编辑器 配置 onChange)
    const { onChange: onChangeFromConfig } = defaultConfig
    if (onChangeFromConfig) onChangeFromConfig(editor)
  }

  const handleDestroyed = (editor: IDomEditor) => {
    const { onDestroyed } = defaultConfig
    setEditor(null)
    if (onDestroyed) {
      onDestroyed(editor)
    }
  }

  // Value changes, resets HTML。(value 变化，重置 HTML)
  useEffect(() => {
    if (editor == null) return

    // Ignore if it is equal to the current html value。(如果和当前 html 值相等，则忽略)
    if (value === curValue) return

    // Reset HTML。(重新设置 HTML)
    try {
      editor.setHtml(value)
    } catch (error) {
      console.error(error)
    }
  }, [value])

  useEffect(() => {
    if (ref.current == null) return
    if (editor != null) return
    // Prevents duplicate rendering when the editor is already created。(防止重复渲染 当编辑器已经创建就不在创建了)
    if (ref.current?.getAttribute('data-w-e-textarea')) return

    const newEditor = createEditor({
      selector: ref.current,
      config: {
        ...defaultConfig,
        onCreated: handleCreated,
        onChange: handleChanged,
        onDestroyed: handleDestroyed
      },
      content: defaultContent,
      html: defaultHtml || value,
      mode
    })
    setEditor(newEditor)
  }, [editor])

  return <div style={style} ref={ref} className={className}></div>
}

export default EditorComponent
