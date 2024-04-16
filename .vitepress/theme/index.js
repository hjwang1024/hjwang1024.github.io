import DefaultTheme from 'vitepress/theme'
import Home from './Home.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('HomePage', Home)
    },
}
