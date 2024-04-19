import { navbar } from 'vuepress-theme-hope'

export default navbar([
    '/',
    {
        text: '💻 前端',
        prefix: '/frontend/',
        children: [
            {
                text: '基础',
                children: [
                    {
                        text: 'HTML&CSS',
                        icon: '/icon/html.svg',
                        link: 'HTMLCSS/',
                    },
                    {
                        text: 'JavaScript',
                        icon: '/icon/javascript.svg',
                        link: 'JavaScript/',
                    },
                    {
                        text: 'TypeScript',
                        icon: '/icon/typescript.svg',
                        link: 'TypeScript/',
                    },
                    {
                        text: '计算机网络',
                        // icon: '/icon/typescript.svg',
                        link: '计算机网络/',
                    },
                ],
            },
            {
                text: '框架&库',
                children: [
                    {
                        text: 'Vue',
                        icon: '/icon/vue.svg',
                        link: '框架/Vue/',
                    },
                    {
                        text: 'React',
                        icon: '/icon/react.svg',
                        link: '框架/React/',
                    },
                    {
                        text: 'Axios',
                        link: '框架/Axios',
                    },
                ],
            },
            {
                text: '进阶',
                children: [
                    {
                        text: '性能优化',
                        link: '性能优化/',
                    },
                    {
                        text: '工程化',
                        icon: '/icon/webpack.svg',
                        link: '工程化/',
                    },
                    {
                        text: 'web API',
                        link: 'webAPI/',
                    },
                ],
            },
        ],
    },
    {
        text: '📑 Server',
        prefix: '/server/',
        children: [
            {
                text: 'Node',
                icon: '/icon/node.svg',
                link: 'Node/',
            },
            {
                text: 'Python',
                icon: '/icon/python.svg',
                link: 'Python/',
            },
            {
                text: 'Nginx',
                icon: '/icon/nginx.svg',
                link: 'Nginx/',
            },
            {
                text: 'Mysql',
                icon: '/icon/mysql.svg',
                link: 'Mysql/',
            },
            {
                text: 'Mongodb',
                icon: '/icon/mongodb.svg',
                link: 'Mongodb/',
            },
            {
                text: 'Redis',
                icon: '/icon/redis.svg',
                link: 'Redis/',
            },
            {
                text: 'Docker',
                icon: '/icon/docker.svg',
                link: 'Docker/',
            },
            {
                text: 'Linux',
                icon: '/icon/linux.svg',
                link: 'Linux/',
            },
            {
                text: '算法',
                icon: '/icon/dataStructure.svg',
                link: '算法/',
            },
        ],
    },
    {
        text: 'PDF电子书',
        icon: 'book',
        link: 'https://github.com/hjwang1024/hjwang1024.github.io/tree/master/src/PDF',
    },
])
