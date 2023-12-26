import type { FC, CSSProperties } from 'react'
import { useMemo } from 'react'
import { useDebounceFn } from 'ahooks'
import { keepCursorEnd, getPasteText } from '@/utils/rich-text'
import { styleState } from './RichTextSetting'

interface InputState {
  value: string
  style?: styleState
  onChange: (value: string) => void
}

const RichTextInput: FC<InputState> = ({ value = '请输入文本', style, onChange }) => {
  const styles = useMemo(() => {
    return {
      minHeight: '20px',
      padding: '6px 8px',
      outline: 'none',
      wordBreak: 'break-all',
      ...style
    }
  }, [style]) as CSSProperties

  const { run: handleInput } = useDebounceFn(
    (event: any) => {
      onChange(event.target.innerHTML)
    },
    {
      wait: 200
    }
  )

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
      style={{ ...styles }}
      contentEditable
      spellCheck='false'
      onPaste={handlePaste}
      onInput={handleInput}
    />
  )
}

export default RichTextInput
