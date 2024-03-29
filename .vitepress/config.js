import { defineConfig } from 'vitepress'
import { genNavSide } from '../scripts/dym-import'
import path from 'path'
const { nav, sidebar } = await genNavSide()
export default defineConfig({
    title: 'DayDayUp',
    description: '学习笔记',
    srcDir: './docs',
    ignoreDeadLinks: true,
    appearance: 'dark',
    base: '/',
    lastUpdated: true, //显示最后更新
    head: [['link', { rel: 'icon', href: '/avatar.jpg' }]],
    themeConfig: {
        nav,
        sidebar,
        logo: '/avatar.png',
        outlineTitle: '本页目录',
        lastUpdatedText: '最后更新',
        socialLinks: [{ icon: 'github', link: 'https://github.com/hjwang1024/hjwang1024.github.io/tree/master/docs' }],
    },
    vite: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../'),
            },
            extensions: ['.vue', '.js', '.json'],
        },
    },
})
