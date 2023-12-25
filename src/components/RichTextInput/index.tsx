import type { FC, CSSProperties } from 'react'
import { keepCursorEnd, getPasteText } from '@/utils/rich-text'

interface PropState {
  value: string
  onChange: (value: string) => void
}

const RichTextInput: FC<PropState> = ({ value = '请输入文本', onChange }) => {
  const style: CSSProperties = {
    minHeight: '20px',
    padding: '6px 8px',
    outline: 'none',
    wordBreak: 'break-all'
  }

  const handleChange = (event: any) => {
    onChange(event.target.innerHTML)
  }

  const handlePaste = (event: any) => {
    event.preventDefault()
    const text = getPasteText(event)
    onChange(text)
    setTimeout(() => {
      keepCursorEnd(event.target)
    }, 0)
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: value }}
      style={{ ...style }}
      contentEditable
      spellCheck='false'
      onPaste={handlePaste}
      onChange={handleChange}
    />
  )
}

export default RichTextInput
