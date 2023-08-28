import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import { createHtmlPlugin } from "vite-plugin-html"
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import fs from 'node:fs'
import * as esbuild from 'esbuild'

const sourceJSPattern = /\/src\/.*\.js$/
const rollupPlugin = (matchers) => ({
  name: "js-in-jsx",
  load(id) {
    if (matchers.some(matcher => matcher.test(id))) {
      const file = fs.readFileSync(id, { encoding: "utf-8" })
      return esbuild.transformSync(file, { loader: "jsx" })
    }
  }
})

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    plugins: [
      vue(),
      vueJsx(),
      viteCompression(),
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
    server: {
      proxy: {
        [env.VITE_APP_REQ_PREFIX]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.substring(env.VITE_APP_REQ_PREFIX.length)
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/assets/styles/global.scss';`
        }
      }
    },
    // build: {
    //   rollupOptions: {
    //     plugins: [
    //       rollupPlugin([sourceJSPattern])
    //     ]
    //   },
    //   commonjsOptions: {
    //     transformMixedEsModules: true
    //   }
    // },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     loader: {
    //       '.js': 'jsx'
    //     }
    //   }
    // },
    // esbuild: {
    //   loader: 'jsx',
    //   include: [
    //     // Add this for business-as-usual behaviour for .jsx and .tsx files
    //     "src/**/*.jsx",
    //     "src/**/*.tsx",
    //     "node_modules/**/*.jsx",
    //     "node_modules/**/*.tsx",
    //
    //     // Add the specific files you want to allow JSX syntax in
    //     "src/LocalJsxInJsComponent.js",
    //     "node_modules/bad-jsx-in-js-component/index.js",
    //     "node_modules/bad-jsx-in-js-component/js/BadJSXinJS.js",
    //     "node_modules/bad-jsx-in-js-component/ts/index.ts",
    //     "node_modules/bad-jsx-in-js-component/ts/BadTSXinTS.ts",
    //
    //     // --- OR ---
    //
    //     // Add these lines to allow all .js files to contain JSX
    //     "src/**/*.js",
    //     "node_modules/**/*.js",
    //
    //     // Add these lines to allow all .ts files to contain JSX
    //     "src/**/*.ts",
    //     "node_modules/**/*.ts",
    //   ]
    // }
  }
})
