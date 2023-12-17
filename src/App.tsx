import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { setupProdMockServer } from '../mock/_createProductionServer'

function App() {
  const isBuild = process.env.NODE_ENV === 'production'
  if (isBuild) {
    setupProdMockServer()
  }

  return <RouterProvider router={router} />
}

export default App
