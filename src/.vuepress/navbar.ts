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
                        icon: '/assets/icon/html.svg',
                        link: 'HTMLCSS/',
                    },
                    {
                        text: 'JavaScript',
                        icon: '/assets/icon/javascript.svg',
                        link: 'JavaScript/',
                    },
                    {
                        text: 'TypeScript',
                        icon: '/assets/icon/typescript.svg',
                        link: 'TypeScript/',
                    },
                    {
                        text: '计算机网络',
                        // icon: '/assets/icon/typescript.svg',
                        link: '计算机网络/',
                    },
                ],
            },
            {
                text: '框架&库',
                children: [
                    {
                        text: 'Vue',
                        icon: '/assets/icon/vue.svg',
                        link: '框架/Vue/',
                    },
                    {
                        text: 'React',
                        icon: '/assets/icon/react.svg',
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
                        icon: '/assets/icon/webpack.svg',
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
                icon: '/assets/icon/node.svg',
                link: 'Node/',
            },
            {
                text: 'Python',
                icon: '/assets/icon/python.svg',
                link: 'Python/',
            },
            {
                text: 'Nginx',
                icon: '/assets/icon/nginx.svg',
                link: 'Nginx/',
            },
            {
                text: 'Mysql',
                icon: '/assets/icon/mysql.svg',
                link: 'Mysql/',
            },
            {
                text: 'Mongodb',
                icon: '/assets/icon/mongodb.svg',
                link: 'Mongodb/',
            },
            {
                text: 'Redis',
                icon: '/assets/icon/redis.svg',
                link: 'Redis/',
            },
            {
                text: 'Docker',
                icon: '/assets/icon/docker.svg',
                link: 'Docker/',
            },
            {
                text: 'Linux',
                icon: '/assets/icon/linux.svg',
                link: 'Linux/',
            },
            {
                text: '算法',
                icon: '/assets/icon/dataStructure.svg',
                link: '算法/',
            },
        ],
    },
])
