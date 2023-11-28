import { BasicLayout } from '@/layout'
import { GuardRoute } from './guardRoute'

export const LayoutGuard = () => {
  return (
    <GuardRoute>
      <BasicLayout />
    </GuardRoute>
  )
}
