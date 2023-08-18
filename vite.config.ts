/// <reference types="vite-ssg" />
/// <reference types="vitest" />

import { URL, fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'
import { configDefaults } from 'vitest/config'

import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

// import VueDevTools from 'vite-plugin-vue-devtools'
import Preview from 'vite-plugin-vue-component-preview'
import Inspect from 'vite-plugin-inspect'
import generateSitemap from 'vite-ssg-sitemap'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'
import Markdown from 'unplugin-vue-markdown/vite'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'

// import WebfontDownload from 'vite-plugin-webfont-dl'

export default ({ mode }: any) => {
  const { VITE_PORT } = loadEnv(mode, process.cwd())

  return defineConfig({
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      https: false,
      port: Number(VITE_PORT),
      host: '0.0.0.0',
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3005',
          changeOrigin: true,
        },
      },
    },

    // test: {
    //   globals: true,
    //   environment: 'jsdom',
    //   deps: {
    //     inline: ['@vue', '@vueuse', 'vue-demi'],
    //   },
    //   setupFiles: ['./src/setup.ts'],
    // },

    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      setupFiles: ['./src/setup.ts'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      transformMode: {
        web: [/\.[jt]sx$/],
      },
    },

    plugins: [
      // WebfontDownload(),
      // VueDevTools(),
      Inspect(),
      Preview(),
      Vue({
        script: {
          defineModel: true,
          propsDestructure: true,
        },
        include: [/\.vue$/, /\.md$/],
      }),
      VueJsx(),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        markdownItSetup(md) {
          md.use(Shiki, {
            theme: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/components.d.ts',
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        globalNamespaces: ['app', 'content', 'forms', 'icons', 'logos'],
        customLoaderMatcher: path => path.endsWith('.md'),
      }),

      Pages({
        extensions: ['vue', 'md'],
      }),

      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/stores',
        ],
        vueTemplate: true,
      }),

      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'Vue Stuff',
          short_name: 'vue-stuff',
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),

    ],

    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      crittersOptions: {
        reduceInlineStyles: false,
      },
      onFinished() {
        generateSitemap()
      },
    },

    ssr: {
      noExternal: ['workbox-window', /vue-i18n/],
    },
  })
}
