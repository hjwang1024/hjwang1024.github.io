import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'DayDayUp',
    description: '学习笔记',
    head: [['link', { rel: 'icon', href: '/avatar.png' }]],
    theme,

    // 和 PWA 一起启用
    // shouldPrefetch: false,
})
