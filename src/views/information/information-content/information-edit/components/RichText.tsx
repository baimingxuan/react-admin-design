import { type FC, useState, useEffect } from 'react'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import Editor from './Editor'
import Toolbar from './Toolbar'
import '@wangeditor/editor/dist/css/style.css'

const RichTextEditor: FC<{ value: string, updateValue: (value: string) => void, style?: React.CSSProperties }> = ({ value, updateValue, style }) => {
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    const [html, setHtml] = useState(value)

    const toolbarConfig: Partial<IToolbarConfig> = {}
    const editorConfig: Partial<IEditorConfig> = {}

    useEffect(() => {
        setHtml(value)
    }, [value])

    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    useEffect(() => {
        updateValue(html)
    }, [html])

    return (
        <div style={{ border: '1px solid #ccc', ...style }}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode='default'
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode='default'
                style={{ height: '500px', overflowY: 'hidden' }}
            />
        </div>
    )
}

export default RichTextEditor
