import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['swiper-slide','swiper-container','swiper-pagination'].includes(tag)
      }
    }
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      mqtt: 'mqtt/dist/mqtt.js', 
    //  'vue': 'vue/dist/vue.esm-bundler' ,
    }
  }
})