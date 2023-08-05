import { PageWrapper } from '@/components/Page'
import { VUE_TREE_ORG_PLUGIN } from '@/settings/websiteSetting'
import { data } from './data'

const OrgTree = () => {

  return (
    <PageWrapper plugin={VUE_TREE_ORG_PLUGIN}>
      <div style={{height: '420px'}}>
      </div>
    </PageWrapper>
  )
}

export default OrgTree