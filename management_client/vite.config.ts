import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8090,
    proxy: {
      // 一旦devServer(8090)服务器接受到 /api/xxx 的请求 就会把请求转发到另外一个服务器(8000)
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true // 跨域
        // 发送请求时，请求路径重写： 将/api/xxx --> /xxx
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
    alias: {
      '/@/': resolve(__dirname, 'src')
    }
  },
})


