import { Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { FLOW_EDITOR_PLUGIN } from '@/settings/websiteSetting'
import { Bpmn } from '@/components/LogicFlow'

const FlowBpmn = () => {
  return (
    <PageWrapper plugin={FLOW_EDITOR_PLUGIN}>
      <Card bordered={false}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '500px' }}>
          <Bpmn />
        </div>
      </Card>
    </PageWrapper>
  )
}

export default FlowBpmn
