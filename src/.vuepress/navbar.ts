import { navbar } from 'vuepress-theme-hope'

export default navbar([
    '/',
    {
        text: '前端',
        prefix: '/frontend/',
        children: [
            {
                text: 'HTML&CSS',
                link: 'HTMLCSS/',
            },
            {
                text: 'JavaScript',
                link: 'JavaScript/',
            },
            {
                text: 'TypeScript',
                link: 'TypeScript/',
            },
            {
                text: '框架',
                link: '框架/',
            },
            {
                text: '计算机网络',
                link: '计算机网络/',
            },
            {
                text: '性能优化',
                link: '性能优化/',
            },
            {
                text: '工程化',
                link: '工程化/',
            },
            {
                text: '工具',
                link: '工具/',
            },
        ],
    },
    {
        text: 'Server',
        prefix: '/server/',
        children: [
            {
                text: 'Node',
                link: 'Node/',
            },
            {
                text: 'Python',
                link: 'Python/',
            },
            {
                text: 'Nginx',
                link: 'Nginx/',
            },
            {
                text: 'Mysql',
                link: 'Mysql/',
            },
            {
                text: 'Redis',
                link: 'Redis/',
            },
            {
                text: 'Docker',
                link: 'Docker/',
            },
            {
                text: 'Linux',
                link: 'Linux/',
            },
            {
                text: '算法',
                link: '算法/',
            },
        ],
    },
])
