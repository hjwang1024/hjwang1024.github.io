import { defineConfig } from 'vitepress'
import { genNavSide } from '../scripts/dym-import'

const { nav, sidebar } = await genNavSide()
export default defineConfig({
    title: 'Blog',
    description: '个人博客',
    srcDir: './docs',
    ignoreDeadLinks: true,
    appearance: 'dark',
    base: '/',
    themeConfig: {
        nav,
        sidebar,
        // sidebar: {
        //     '/Project/': [
        //         {
        //             text: 'Guide',
        //             items: [
        //                 { text: 'Index', link: '/guide/' },
        //                 { text: 'One', link: '/guide/one' },
        //                 { text: 'Two', link: '/guide/two' },
        //             ],
        //             collapsed: true,
        //         },
        //         {
        //             text: 'Project',
        //             link: '/Project/1',
        //         },
        //         {
        //             text: 'Proj123ect',
        //             link: '/Proje123ct/1',
        //         },
        //         {
        //             text: 'Gui2131de',
        //             items: [
        //                 { text: 'In213dex', link: '/guide/' },
        //                 { text: 'One213', link: '/guide/one' },
        //                 { text: 'Two123', link: '/guide/two' },
        //             ],
        //         },
        //     ],
        // },
        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
    vite: {
        resolve: {
            alias: {
                // '@': path.resolve(__dirname, '../'),
            },
            extensions: ['.vue', '.js', '.json'],
        },
    },
})
