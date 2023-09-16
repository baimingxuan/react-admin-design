import { FC, useState } from 'react'
import { useImmer } from 'use-immer'
import { Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { CODEMIRROR_PLUGIN } from '@/settings/websiteSetting'
import { ConfigState, InfoState } from './types'
import Codemirror from '@uiw/react-codemirror'
import Toolbar from './components/Toolbar'
import CodeInfo from './components/CodeInfo'

const CodeMirror: FC = () => {
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

  const handleValueChange = (values: any) => {
    setConfig({...config, ...values})
  }

  const handleChange = (value: any) => {
    setCodeVal(value)
  }

  const handleStateUpdate = (viewUpdate: any) => {
    const ranges = viewUpdate.state.selection.ranges
    setCodeInfo({
      lines: viewUpdate.state.doc.lines,
      cursor: ranges[0].anchor,
      selected: ranges.reduce((plus: any, range: any) => plus + range.to - range.from, 0),
      length: viewUpdate.state.doc.length
     })
  }

  return (
    <PageWrapper plugin={CODEMIRROR_PLUGIN}>
      <Card bordered={false}>
        <Toolbar config={config} valueChange={handleValueChange} />
        <Codemirror
          value={codeVal}
          height={config.height}
          autoFocus={config.autoFocus}
          indentWithTab={config.indentWithTab}
          style={{
            borderLeft: 'solid 1px #ddd',
            borderRight: 'solid 1px #ddd'
          }}
          extensions={[]}
          placeholder="Please enter the code..."
          onChange={handleChange}
          onUpdate={handleStateUpdate}
        />
        <CodeInfo info={codeInfo} />
      </Card>
    </PageWrapper>
  )
}

export default CodeMirror