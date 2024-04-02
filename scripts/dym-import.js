/**
 * 生成导航栏和侧边栏
 */

import fs from 'fs'
import path from 'path'

const SRC_DIR = 'docs'

const IGNORE_FILE = ['index', 'nav', '.DS_Store', 'nav.js', 'index.js', 'index.md']
const IGNORE_DIR = ['images', 'public', 'PDF']
const IGNORE_EXT = ['.html', '.js', '.DS_Store'] //忽略后缀

const srcSource = path.resolve(SRC_DIR)
const isDirectory = filePath => {
    const fileStat = fs.statSync(filePath)
    return fileStat.isDirectory()
}

function read(filePath, res) {
    let dirs = fs.readdirSync(filePath)
    dirs = dirs.filter(dir => !IGNORE_DIR.includes(dir) && !IGNORE_EXT.includes(path.extname(dir)))
    dirs.forEach(dir => {
        const current = filePath + '/' + dir
        if (isDirectory(current)) {
            read(current, res)
        } else {
            if (!IGNORE_FILE.includes(dir)) {
                const fileName = dir.split('.')[0]
                const title = fileName === 'index' ? path.basename(filePath) : fileName
                res.push({
                    text: title,
                    link: current.split(SRC_DIR)[1].replace('.md', ''),
                })
            }
        }
    })
}

async function getNavJs() {
    const res = []
    const dirs = fs.readdirSync(srcSource).filter(dir => !IGNORE_DIR.includes(dir) && !dir.includes('.'))
    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i] //文件夹名 如Project
        const dirPath = srcSource + '/' + dir
        const navFilePath = dirPath + '/nav.js'
        try {
            const navFile = await import(navFilePath)
            const navData = navFile.default
            navData.sideDirs = fs.readdirSync(dirPath)
            navData.sideDirs = navData.sideDirs.filter(dir => !IGNORE_DIR.includes(dir) && !IGNORE_FILE.includes(dir))
            navData.dir = dir
            res.push(navData)
        } catch (error) {
            console.log('error', error)
        }
    }
    return res
}

export function genItems(dir) {
    const res = []
    read(path.resolve(SRC_DIR + '/' + dir), res)
    return res
}

export async function genNavSide() {
    const navList = await getNavJs()
    const nav = []
    const sidebar = {}
    navList.sort((a, b) => a.sort - b.sort)
    for (let i = 0; i < navList.length; i++) {
        let { dir, navText, sideDirs } = navList[i]
        const dirName = `/${dir}/`
        // 生成导航栏
        const navItem = {
            text: navText,
            link: dirName,
        }
        nav.push(navItem)
        // 生成侧边栏
        sidebar[dirName] = []
        sideDirs.forEach(sidedir => {
            if (sidedir.indexOf('.') > -1) {
                const side = sidedir.split('.')[0]
                sidebar[dirName].push({
                    text: side,
                    link: `${dirName}${side}`,
                })
            } else {
                let dirs = fs.readdirSync(path.resolve(SRC_DIR + '/' + `${dir}/${sidedir}`))
                dirs = dirs.filter(
                    dir =>
                        !IGNORE_DIR.includes(dir) &&
                        !IGNORE_EXT.includes(path.extname(dir)) &&
                        path.extname(dir) == '.md'
                )
                if (dirs.length === 1 && dirs[0] === 'index.md') {
                    sidebar[dirName].push({
                        text: sidedir,
                        link: `${dirName}${sidedir}/index`,
                    })
                } else {
                    sidebar[dirName].unshift({
                        text: sidedir,
                        link: `${dirName}${sidedir}/`,
                        items: genItems(`${dir}/${sidedir}`),
                        collapsed: true,
                    })
                }
            }
        })
    }
    console.log('nav', nav)
    console.log('sidebar', sidebar)
    return {
        nav,
        sidebar,
    }
}
