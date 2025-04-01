import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import { wrapperEnv } from './build/utils'
// 需要安装 @typings/node 插件
import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const isBuild = command === 'build'

  const env = loadEnv(mode, root)

  // this function can be converted to different typings
  const viteEnv: any = wrapperEnv(env)
  const { VITE_PORT, VITE_DROP_CONSOLE } = viteEnv

  return {
    base: './',
    server: {
      // Listening on all local ips
      host: true,
      open: true,
      port: VITE_PORT,
      // port: 8990,
      proxy: {
        '/api': { // 匹配请求路径，localhost:3000/snow
          target: 'http://192.168.31.80:6780/api', // 代理的目标地址
          // target: 'https://crypto-pulse.io/api', // 代理的目标地址
          // target: 'http://192.168.31.80:6780/api', // 代理的目标地址
          changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
          secure: false, // 是否https接口
          rewrite: (path) => path.replace(/^\/api/, ""),
        }
      },
    },
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // 开发模式下启用mock
      // viteMockServe({
      //   mockPath: 'mock',
      //   ignore: /^_/,
      //   localEnabled: !isBuild,
      //   prodEnabled: isBuild,
      //   injectCode: `
      //     import { setupProdMockServer } from 'mock/_createProductionServer';

      //     setupProdMockServer()
      //     `
      // })
    ],

    build: {
      target: 'es2015',
      cssTarget: 'chrome86',
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // used to delete console and debugger in production environment
          drop_console: VITE_DROP_CONSOLE
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
