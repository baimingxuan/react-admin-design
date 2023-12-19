import { Card } from 'antd'
import { PageWrapper } from '@/components/Page'
import { FLOW_EDITOR_PLUGIN } from '@/settings/websiteSetting'
import { Approve } from '@/components/LogicFlow'

const FlowApprove = () => {
  return (
    <PageWrapper plugin={FLOW_EDITOR_PLUGIN}>
      <Card bordered={false}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '500px' }}>
          <Approve />
        </div>
      </Card>
    </PageWrapper>
  )
}

export default FlowApprove
