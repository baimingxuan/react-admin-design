import { Component } from 'react'
import LogicFlow from '@logicflow/core'
import { BpmnElement, Control, Menu, SelectionSelect } from '@logicflow/extension'
import BpmnPattern from './pattern'
import './index.css'
import '@logicflow/extension/lib/style/index.css'

const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
  metaKeyMultipleSelected: true,
  grid: {
    size: 10,
    type: 'dot'
  },
  keyboard: {
    enabled: true
  },
  snapline: true
}

type IState = {
  rendered: boolean
}
type IProps = {}

export default class BpmnExample extends Component<IProps, IState> {
  lf = null as unknown as LogicFlow
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = {
      rendered: true
    }
  }
  componentDidMount() {
    LogicFlow.use(BpmnElement)
    LogicFlow.use(Control)
    LogicFlow.use(Menu)
    LogicFlow.use(SelectionSelect)
    const lf = new LogicFlow({
      ...config,
      container: document.querySelector('#graphBpmn') as HTMLElement
    })
    lf.render()
    this.lf = lf
    this.setState({
      rendered: true
    })
  }
  render() {
    const { rendered } = this.state
    let tools
    if (rendered) {
      tools = (
        <div>
          <BpmnPattern lf={this.lf} />
        </div>
      )
    }
    return (
      <>
        <div className='bpmn-example-container'>
          <div id='graphBpmn' className='viewport'></div>
          {tools}
        </div>
      </>
    )
  }
}
