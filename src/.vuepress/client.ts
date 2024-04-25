// .vuepress/client.ts
import { defineClientConfig } from 'vuepress/client'
import { defineAsyncComponent } from 'vue'
import { setupRunningTimeFooter } from 'vuepress-theme-hope/presets/footerRunningTime.js'
import Travel from './components/Travel.vue'

export default defineClientConfig({
    setup() {
        setupRunningTimeFooter(
            new Date('2022-03-16'),
            {
                '/': ':day 天 :hour 小时 :minute 分钟 :second 秒',
            },
            true
        )
    },
    enhance({ app, router, siteData }) {
        app.component('Travel', Travel)
    },
    rootComponents: [],
})
