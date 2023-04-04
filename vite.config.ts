import type { ConfigEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
// need install plugin @types/node
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    base: './',
    server: {
      host: '0.0.0.0'
    },
    plugins: [react()],
    resolve: {
      alias: {
				'@': resolve(__dirname, './src')
			}
    }
  }
}
