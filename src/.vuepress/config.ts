import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import theme from './theme.js'
import metingPlugin from 'vuepress-plugin-meting2'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
const _resolve = dir => {
    return path.resolve(__dirname, dir)
}
export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'DayDayUp',
    description: '学习笔记',
    head: [['link', { rel: 'icon', href: '/images/avatar.png' }]],
    theme,
    bundler: viteBundler({
        viteOptions: {
            resolve: {
                alias: {
                    '@': _resolve('../../src'),
                },
            },
        },
        vuePluginOptions: {},
    }),

    // 和 PWA 一起启用
    // shouldPrefetch: false,
    plugins: [
        metingPlugin({
            metingOptions: {
                global: true,
                server: 'tencent',
                api: 'https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r',
                type: 'playlist',
                mid: '851947617',
            },
        }),
        viteCompression(),
    ],
})
