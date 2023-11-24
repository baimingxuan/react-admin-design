import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { wrapperEnv } from './build/utils'
// need install plugin @typings/node
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // this function can be converted to different typings
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_DROP_CONSOLE } = viteEnv

  return {
    base: '/react-admin-design/',
    server: {
      // Listening on all local ips
      host: true,
      port: VITE_PORT
    },
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: 'mock',
        ignore: /^\_/
      })
    ],

    build: {
      target: 'es2015',
      cssTarget: 'chrome86',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      },
      chunkSizeWarningLimit: 2000
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  }
}
