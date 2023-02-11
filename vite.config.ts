import type { ConfigEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    base: './',
    server: {
      host: '0.0.0.0'
    },
    plugins: [react()]
  }
}
