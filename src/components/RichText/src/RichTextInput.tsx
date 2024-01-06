import type { FC, CSSProperties } from 'react'
import { useMemo } from 'react'
import { useDebounceFn } from 'ahooks'
import { keepCursorEnd, getPasteText } from '@/utils/rich-text'
import type { styleState } from '@/types'

interface InputState {
  value: string
  style?: styleState
  hasBorder?: boolean
  onChange: (value: string) => void
}

const RichTextInput: FC<InputState> = ({ value = '请输入文本', style = {}, hasBorder = false, onChange }) => {
  const styles = useMemo(() => {
    const borderStyle = hasBorder ? { border: '1px solid #d9d9d9', borderRadius: '6px' } : {}

    return {
      minHeight: '20px',
      padding: '6px 8px',
      outline: 'none',
      wordBreak: 'break-all',
      ...borderStyle,
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
      className='rich-text-input'
      style={{ ...styles }}
      contentEditable
      spellCheck='false'
      onPaste={handlePaste}
      onInput={handleInput}
    />
  )
}

export default RichTextInput
