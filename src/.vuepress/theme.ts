import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar.js'
import sidebar from './sidebar.js'

export default hopeTheme({
    hostname: 'https://hjwang1024.github.io/',

    author: {
        name: '星星',
        url: 'https://github.com/hjwang1024',
        email: 'hjwang1024@163.com',
    },

    // iconAssets: 'fontawesome-with-brands',

    logo: '/images/avatar.png',

    repo: 'https://github.com/hjwang1024/hjwang1024.github.io',

    docsDir: 'src',
    fullscreen: false, // 页面全屏

    // 导航栏
    navbar,

    // 侧边栏
    sidebar,

    // 页脚
    footer: '本站已运行',
    displayFooter: true,

    // print: false //打印按钮
    // pure: true, //纯净模式！

    // 博客相关
    blog: {
        avatar: '/images/avatar.png',
        roundAvatar: true, //是否剪裁头像为圆形形状
        description: '好好学习，天天向上',
        intro: 'https://github.com/hjwang1024',
        medias: {
            Email: 'https://hjwang1024@163.com',
            Gitee: 'https://gitee.com/hjwang1024',
            GitHub: 'https://github.com/hjwang1024',
            LeetCode: 'https://leetcode.cn/u/whj/',
        },
        timeline: '时光荏苒，昨日不在', //时间轴的顶部文字
        articlePerPage: 10, //每页的文章数量
        articleInfo: ['Date'], //文章列表中展示的文章信息
    },

    // 加密配置
    encrypt: {
        config: {
            // '/demo/encrypt.html': ['1234'],
        },
    },
    editLink: false,
    // 多语言配置
    metaLocales: {
        editLink: '在 GitHub 上编辑此页',
    },

    // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
    // hotReload: true,

    // 在这里配置主题提供的插件
    plugins: {
        blog: true,

        searchPro: {
            // 索引全部内容
            indexContent: true,
            // 为分类和标签添加索引
            customFields: [
                {
                    getter: page => page.frontmatter.category as any,
                    formatter: '分类：$content',
                },
                {
                    getter: page => page.frontmatter.tag as any,
                    formatter: '标签：$content',
                },
            ],
        },
        comment: {
            provider: 'Giscus', // Artalk | Giscus | Waline | Twikoo
            repo: 'hjwang1024/hjwang1024.github.io',
            repoId: 'R_kgDOLmHvSA',
            category: 'Announcements',
            categoryId: 'DIC_kwDOLmHvSM4CexKN',
        },

        components: {
            components: ['Badge', 'VPCard', 'FontIcon', 'SiteInfo', 'PDF'],
            componentOptions: {
                pdf: {
                    pdfjs: '/assets/lib/pdfjs/',
                },
            },
        },

        // 此处开启了很多功能用于演示，你应仅保留用到的功能。
        mdEnhance: {
            align: true,
            attrs: true,
            codetabs: true,
            component: true,
            demo: true,
            figure: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            mark: true,
            stylize: [
                {
                    matcher: 'Recommended',
                    replacer: ({ tag }) => {
                        if (tag === 'em')
                            return {
                                tag: 'Badge',
                                attrs: { type: 'tip' },
                                content: 'Recommended',
                            }
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            tasklist: true,
            vPre: true,

            // 在启用之前安装 chart.js
            // chart: true,

            // insert component easily

            // 在启用之前安装 echarts
            // echarts: true,

            // 在启用之前安装 flowchart.ts
            // flowchart: true,

            // gfm requires mathjax-full to provide tex support
            // gfm: true,

            // 在启用之前安装 katex
            // katex: true,

            // 在启用之前安装 mathjax-full
            // mathjax: true,

            // 在启用之前安装 mermaid
            // mermaid: true,

            // playground: {
            //   presets: ["ts", "vue"],
            // },

            // 在启用之前安装 reveal.js
            // revealJs: {
            //   plugins: ["highlight", "math", "search", "notes", "zoom"],
            // },

            // 在启用之前安装 @vue/repl
            // vuePlayground: true,

            // install sandpack-vue3 before enabling it
            // sandpack: true,
        },

        // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
        // pwa: {
        //   favicon: "/favicon.ico",
        //   cacheHTML: true,
        //   cachePic: true,
        //   appendBase: true,
        //   apple: {
        //     icon: "/assets/icon/apple-icon-152.png",
        //     statusBarColor: "black",
        //   },
        //   msTile: {
        //     image: "/assets/icon/ms-icon-144.png",
        //     color: "#ffffff",
        //   },
        //   manifest: {
        //     icons: [
        //       {
        //         src: "/assets/icon/chrome-mask-512.png",
        //         sizes: "512x512",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-mask-192.png",
        //         sizes: "192x192",
        //         purpose: "maskable",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-512.png",
        //         sizes: "512x512",
        //         type: "image/png",
        //       },
        //       {
        //         src: "/assets/icon/chrome-192.png",
        //         sizes: "192x192",
        //         type: "image/png",
        //       },
        //     ],
        //     shortcuts: [
        //       {
        //         name: "Demo",
        //         short_name: "Demo",
        //         url: "/demo/",
        //         icons: [
        //           {
        //             src: "/assets/icon/guide-maskable.png",
        //             sizes: "192x192",
        //             purpose: "maskable",
        //             type: "image/png",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
    },
})
