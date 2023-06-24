import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: env.VITE_APP_TITLE
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
        'api': join(__dirname, 'src/api'),
        'utils': join(__dirname, 'src/utils'),
        'comp': join(__dirname, 'src/components'),
        'views': join(__dirname, 'src/views'),
        'store': join(__dirname, 'src/store')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/assets/styles/global.scss';`
        }
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_REQ_PREFIX]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.substring(env.VITE_APP_REQ_PREFIX.length)
        }
      }
    }
  }
})
