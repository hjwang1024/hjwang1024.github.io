import { defineUserConfig } from 'vuepress'
import theme from './theme.js'
import metingPlugin from 'vuepress-plugin-meting2'

export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'DayDayUp',
    description: '学习笔记',
    head: [['link', { rel: 'icon', href: '/avatar.png' }]],
    theme,

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
    ],
    // plugins: [
    //     metingPlugin,
    //     {
    //         // 这个 API 是不可用的，只是作为示例而已
    //         metingApi: 'https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r',
    //         meting: {
    //             server: 'tencent',
    //             type: 'playlist',
    //             mid: '851947617',
    //         }, // 不配置该项的话不会出现全局播放器
    //         aplayer: {
    //             lrcType: 3,
    //         },
    //         defaultCover: 'https://nyakku.moe/avatar.jpg',
    //     },
    // ],
})
