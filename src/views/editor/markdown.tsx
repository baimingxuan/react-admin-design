import { type FC, useState } from 'react'
import { PageWrapper } from '@/components/Page'
import { MARKDOWN_EDITOR_PLUGIN } from '@/settings/websiteSetting'
import MDEditor from '@uiw/react-md-editor'

const MarkdownEditor: FC = () => {
  const [value, setValue] = useState('**Hello world!!!**')

  const handleChange = (value: any) => {
    setValue(value)
  }

  return (
    <PageWrapper plugin={MARKDOWN_EDITOR_PLUGIN}>
      <div data-color-mode='light'>
        <MDEditor value={value} height={400} onChange={handleChange} />
      </div>
    </PageWrapper>
  )
}

export default MarkdownEditor
