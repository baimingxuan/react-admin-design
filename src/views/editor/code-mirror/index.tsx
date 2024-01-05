import type { FC } from 'react'
import type { ConfigState, InfoState } from './types'
import { useState, useCallback } from 'react'
import { useImmer } from 'use-immer'
import { Card } from 'antd'
import { useDebounceFn } from 'ahooks'
import { PageWrapper } from '@/components/Page'
import { CODEMIRROR_PLUGIN } from '@/settings/websiteSetting'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import Toolbar from './components/Toolbar'
import CodeInfo from './components/CodeInfo'

const CodeMirrorEditor: FC = () => {
  const [codeVal, setCodeVal] = useState(`console.log('Hello, world!')`)
  const [config, setConfig] = useState<ConfigState>({
    language: 'javascript',
    autoFocus: true,
    indentWithTab: true,
    height: '350px'
  })
  const [codeInfo, setCodeInfo] = useImmer<InfoState>({
    lines: null as null | number,
    cursor: null as null | number,
    selected: null as null | number,
    length: null as null | number
  })

  const { run: handleStateUpdate } = useDebounceFn(
    (viewUpdate: any) => {
      const ranges = viewUpdate.state.selection.ranges
      const lines = viewUpdate.state.doc.lines
      const cursor = ranges[0].head
      const selected = ranges.reduce((plus: any, range: any) => plus + range.to - range.from, 0)
      const length = viewUpdate.state.doc.length
      setCodeInfo({
        lines,
        cursor,
        selected,
        length
      })
    },
    { wait: 200 }
  )

  const handleValueChange = useCallback((values: any) => {
    setConfig({ ...config, ...values })
  }, [])

  const handleChange = useCallback((value: any) => {
    setCodeVal(value)
  }, [])

  return (
    <PageWrapper plugin={CODEMIRROR_PLUGIN}>
      <Card bordered={false}>
        <Toolbar config={config} valueChange={handleValueChange} />
        <CodeMirror
          value={codeVal}
          height={config.height}
          autoFocus={config.autoFocus}
          indentWithTab={config.indentWithTab}
          style={{
            borderLeft: 'solid 1px #ddd',
            borderRight: 'solid 1px #ddd'
          }}
          extensions={[javascript({ jsx: true })]}
          placeholder='Please enter the code...'
          onChange={handleChange}
          onUpdate={handleStateUpdate}
        />
        <CodeInfo info={codeInfo} />
      </Card>
    </PageWrapper>
  )
}

export default CodeMirrorEditor
