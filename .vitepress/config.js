import { defineConfig } from 'vitepress'
import { genNavSide } from '../scripts/dym-import'



const { nav, sidebar } = await genNavSide()
export default defineConfig({
  title: "Blog",
  description: "个人博客",
  srcDir: './docs',
  ignoreDeadLinks: true,
  appearance: 'dark',
  base: '/',
  themeConfig: {
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
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
