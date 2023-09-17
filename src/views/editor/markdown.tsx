import { FC, useState } from 'react'
import { PageWrapper } from '@/components/Page'
import { MARKDOWN_EDITOR_PLUGIN } from '@/settings/websiteSetting'
import MDEditor from '@uiw/react-md-editor'

const MarkdownEditor: FC = () => {
  const [value, setValue] = useState("**Hello world!!!**")

  const handleChange = (value: any) => {
    setValue(value)
  }

  return (
    <PageWrapper plugin={MARKDOWN_EDITOR_PLUGIN}>
      <div className="container">
        <MDEditor
          value={value}
          onChange={handleChange}
        />
        <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
      </div>
    </PageWrapper>
  )
}

export default MarkdownEditor