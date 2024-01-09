import { type FC, useState, useEffect } from 'react'
import { PageWrapper } from '@/components/Page'
import { WANG_EDITOR_PLUGIN } from '@/settings/websiteSetting'
import type { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'
import '@wangeditor/editor/dist/css/style.css'

const RichTextEditor: FC = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('<p>hello</p>')

  const toolbarConfig: Partial<IToolbarConfig> = {}
  const editorConfig: Partial<IEditorConfig> = {}

  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <PageWrapper plugin={WANG_EDITOR_PLUGIN}>
      <div style={{ border: '1px solid #ccc' }}>
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
    </PageWrapper>
  )
}

export default RichTextEditor
