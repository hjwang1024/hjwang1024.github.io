# 性能优化

## 路由懒加载

-   SPA 项目，一个路由对应一个页面，如果不做处理，项目打包后，会把所有页面打包成一个文件，当用户打开首页时，会一次性加载所有的资源，造成首页加载很慢，降低用户体验
-   实现原理：ES6 的动态地加载模块——import(),调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中
-   `const Home = () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue")`

## 组件懒加载

-   页面的 JS 文件体积大，导致页面打开慢，可以通过组件懒加载进行资源拆分，利用浏览器并行下载资源，提升下载速度（比如首页）；需要一定条件下才触发（比如弹框组件）；复用性高，很多页面都有引入，利用组件懒加载抽离出该组件，一方面可以很好利用缓存，同时也可以减少页面的 JS 文件大小

## 合理使用 Tree shaking

-   tree-shaking 依赖于 ES6 的模块特性，ES6 模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础
-   但如果 export default 导出的是一个对象，无法通过静态分析判断出一个对象的哪些变量未被使用，所以 tree-shaking 只对使用 export 导出的变量生效

## 骨架屏优化白屏时长

-   vue-skeleton-webpack-plugin

```js
// vue.config.js
// 骨架屏
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
module.exports = {
    configureWebpack: {
        plugins: [
            new SkeletonWebpackPlugin({
                // 实例化插件对象
                webpackConfig: {
                    entry: {
                        app: path.join(__dirname, './src/skeleton.js'), // 引入骨架屏入口文件
                    },
                },
                minimize: true, // SPA 下是否需要压缩注入 HTML 的 JS 代码
                quiet: true, // 在服务端渲染时是否需要输出信息到控制台
                router: {
                    mode: 'hash', // 路由模式
                    routes: [
                        // 不同页面可以配置不同骨架屏
                        // 对应路径所需要的骨架屏组件id，id的定义在入口文件内
                        { path: /^\/home(?:\/)?/i, skeletonId: 'homeSkeleton' },
                        { path: /^\/detail(?:\/)?/i, skeletonId: 'detailSkeleton' },
                    ],
                },
            }),
        ],
    },
}

// skeleton.js
import Vue from 'vue'
// 引入对应的骨架屏页面
import homeSkeleton from './views/homeSkeleton'
import detailSkeleton from './views/detailSkeleton'

export default new Vue({
    components: {
        homeSkeleton,
        detailSkeleton,
    },
    template: `
    <div>
      <homeSkeleton id="homeSkeleton" style="display:none;" />
      <detailSkeleton id="detailSkeleton" style="display:none;" />
    </div>
  `,
})
```

## 虚拟滚动

-   虚拟滚动的插件有很多，比如 vue-virtual-scroller、vue-virtual-scroll-list、react-tiny-virtual-list、react-virtualized 等

```js
// 安装插件
npm install vue-virtual-scroller

// main.js
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.use(VueVirtualScroller)

// 使用
<template>
  <RecycleScroller
    class="scroller"
    :items="list"
    :item-size="32"
    key-field="id"
    v-slot="{ item }">
      <div class="user"> {{ item.name }} </div>
  </RecycleScroller>
</template>

```

## Web Worker 优化长任务

-   由于浏览器 GUI 渲染线程与 JS 引擎线程是互斥的关系，当页面中有很多长任务时，会造成页面 UI 阻塞，出现界面卡顿、掉帧等情况
-   当任务的运算时长 - 通信时长 > 50ms，推荐使用 Web Worker （通信时长：新建一个 web worker, 浏览器会加载对应的 worker.js 资源，也叫加载时长）

## requestAnimationFrame 制作动画

setTimeout/setInterval、requestAnimationFrame 三者的区别：

-   引擎层面
    setTimeout/setInterval 属于 JS 引擎，requestAnimationFrame 属于 GUI 引擎
    JS 引擎与 GUI 引擎是互斥的，也就是说 GUI 引擎在渲染时会阻塞 JS 引擎的计算
-   时间是否准确
    requestAnimationFrame 刷新频率是固定且准确的，但 setTimeout/setInterval 是宏任务，根据事件轮询机制，其他任务会阻塞或延迟 js 任务的执行，会出现定时器不准的情况
-   性能层面
    当页面被隐藏或最小化时，setTimeout/setInterval 定时器仍会在后台执行动画任务，而使用 requestAnimationFrame 当页面处于未激活的状态下，屏幕刷新任务会被系统暂停

## 图片优化

-   图片的动态裁剪，使图片变小
-   图片懒加载，data-xxx 属性，vue-lazyload
-   使用字体图标,iconfont,一个图标字体要比一系列的图像要小。一旦字体加载了，图标就会马上渲染出来，减少了 http 请求,可以随意的改变颜色、产生阴影、透明效果、旋转,几乎支持所有的浏览器
-   图片转 base64 格式，减少 http 请求,处理小图片，url-loader

    ```js
    // 安装
    npm install url-loader --save-dev

    // 配置
    module.exports = {
      module: {
        rules: [{
            test: /.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                  // 小于 10kb 的图片转化为 base64
                  limit: 1024 * 10
                }
            }]
         }]
      }
    };
    ```

## 图片预加载

```js
// main.js
import { preload } from "@/plugins/preload.js";
import PreloadImage from "@/components/PreloadImage.vue"; //图片预加载组件
Vue.component(PreloadImage.name, PreloadImage);
//图片预加载方法
preload();

// preload.js
import store from "store";
const createImageElement = (image_src) => {
    const imageElement = new Image();
    imageElement.setAttribute("src", image_src);
    imageElement.setAttribute("alt", "");
    return imageElement;
};
export const preload = () => {
    const resources = require.context("@/assets/images/preload", false, /\.(png|jpg|PNG|JPG)$/);  // 需要预加载的图片放在指定文件夹
    resources
        .keys()
        .filter((_) => !_.includes("assets/images/preload"))
        .forEach((absolute_src) => {
            let image_name = absolute_src.replace(/^\.\//, "").replace(/\.\w+$/, "");
            let image_element = createImageElement(resources(absolute_src));
            store.commit("SET_PRELOAD_IMAGE", { image_name, image_element });
        });
};

// store.js
state:{
  preloadImageObject:{}
}
mutations: {
  SET_PRELOAD_IMAGE(state, { image_name, image_element }) {
      state.preloadImageObject[image_name] = image_element;
  },
},


// PreloadImage.vue
<template>
    <div class="preload-image" ref="imageWrap"></div>
</template>

<script>
export default {
    name: "PreloadImage",
    props: {
        imageName: String,
    },
    computed: {
        preloadImageObject() {
            return this.$store.state.preloadImageObject;
        },
        currentImage() {
            return this.preloadImageObject[this.imageName] || null;
        },
    },
    mounted() {
        console.log("mounted:");
        this.$nextTick(() => {
            this.$refs.imageWrap && this.$refs.imageWrap.appendChild(this.currentImage);
        });
    },
    beforeDestroy() {
        this.$refs.imageWrap && this.$refs.imageWrap.removeChild(this.currentImage);
    },
};
</script>
```

## echarts 异步加载

```js
<template>
  <div class="app-container">
    <div class="charts">
      <div v-for="item in domList" :id="item" :key="item" class="chart" />
    </div>
  </div>
</template>

<script>
const echarts = require("echarts");

const chartNum = 1000; // 图表数量
const MAX_CURRENT = 50; // 图表最大渲染并发数
const chartIntervalTime = 2000; // 图表定时渲染毫秒数

let executing = [];
/**
 * @params {Number} poolLimit -最大并发限制数
 * @params {Array} array -所有的并发请求|渲染数组
 * @params {Function} iteratorFn -对应执行的并发函数(接受 array 的每一项值)
 */
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 所有执行中的 promises
  executing = []; // 正在执行中的 promises
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    if (array.length >= poolLimit) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

export default {
  data() {
    return {
      domList: [],
      chartObjs: {},
      chartData: [150, 230, 224, 218, 135, 147, 260],
    };
  },
  mounted() {
    // 创建echart并绘图
    this.createChart();
    // 隔3秒更新图表数据并渲染
    this.intervalChartData(chartIntervalTime);
  },
  methods: {
    // 创建echart并绘图
    async createChart() {
      for (let i = 1; i <= chartNum; i++) {
        this.domList.push("chart" + i);
      }
      this.$nextTick(this.renderChartList);
    },
    async renderChartList() {
      const res = await asyncPool(MAX_CURRENT, this.domList, (i, arr) => {
        return new Promise(async (resolve) => {
          const res = await this.initChart(i);
          resolve(res);
        }).then((data) => {
          console.log(data);
          return data;
        });
      });
    },
    // 隔3秒更新图表数据并渲染
    intervalChartData(s) {
      setInterval(() => {
        if (executing.length > 0) return; // 还有正在执行的渲染 不重复添加
        this.renderChartList();
      }, s);
    },
    // 初始化图表
    initChart(domId) {
      return new Promise((resolve) => {
        if (!this.chartObjs[domId]) {
          this.chartObjs[domId] = echarts.init(document.getElementById(domId));
        }
        const option = {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: this.chartData,
              type: "line",
            },
          ],
        };
        this.chartObjs[domId].clear();
        this.chartObjs[domId].setOption(option);
        this.chartObjs[domId].on("finished", () => {
          resolve(domId);
        });
      });
    },
  },
};
</script>

<style scoped>
.chart {
  float: left;
  width: 360px;
  height: 300px;
  margin: 10px;
  border: 2px solid #ff9900;
}
</style>

```

## js 控制并发数量

```js
// es6
function asyncPool(poolLimit, array, iteratorFn) {
    let i = 0
    const ret = [] // 存储所有的异步任务
    const executing = [] // 存储正在执行的异步任务
    const enqueue = function () {
        if (i === array.length) {
            return Promise.resolve()
        }
        const item = array[i++] // 获取新的任务项
        const p = Promise.resolve().then(() => iteratorFn(item, array))
        ret.push(p)

        let r = Promise.resolve()

        // 当poolLimit值小于或等于总任务个数时，进行并发控制
        if (poolLimit <= array.length) {
            // 当任务完成后，从正在执行的任务数组中移除已完成的任务
            const e = p.then(() => executing.splice(executing.indexOf(e), 1))
            executing.push(e)
            if (executing.length >= poolLimit) {
                r = Promise.race(executing)
            }
        }

        // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
        return r.then(() => enqueue())
    }
    return enqueue().then(() => Promise.all(ret))
}

// es7
async function asyncPool(poolLimit, array, iteratorFn) {
    const ret = [] // 存储所有的异步任务
    const executing = [] // 存储正在执行的异步任务
    for (const item of array) {
        // 调用iteratorFn函数创建异步任务
        const p = Promise.resolve(iteratorFn(item))
        ret.push(p) // 保存新的异步任务

        // 当poolLimit值小于或等于总任务个数时，进行并发控制
        if (poolLimit <= array.length) {
            // 当任务完成后，从正在执行的任务数组中移除已完成的任务
            const e = p.then(() => executing.splice(executing.indexOf(e), 1))
            executing.push(e) // 保存正在执行的异步任务
            if (executing.length >= poolLimit) {
                // 一旦正在执行的promise列表数量等于限制数，就使用Promise.race等待某一个promise状态发生变更，
                // 状态变更后，就会执行上面then的回调，将该promise从executing中删除，
                // 然后再进入到下一次for循环，生成新的promise进行补充
                await Promise.race(executing) // 等待较快的任务执行完成
            }
        }
    }
    return Promise.all(ret)
}

// es9
// for await (const value of asyncPool(concurrency, iterable, iteratorFn)) {
//   ...
// }
async function* asyncPool(concurrency, iterable, iteratorFn) {
    const executing = new Set()
    async function consume() {
        const [promise, value] = await Promise.race(executing)
        executing.delete(promise)
        return value
    }
    for (const item of iterable) {
        // Wrap iteratorFn() in an async fn to ensure we get a promise.
        // Then expose such promise, so it's possible to later reference and
        // remove it from the executing pool.
        const promise = (async () => await iteratorFn(item, iterable))().then(value => [promise, value])
        executing.add(promise)
        if (executing.size >= concurrency) {
            yield await consume()
        }
    }
    while (executing.size) {
        yield await consume()
    }
}

// eg:
const timeout = i => {
    console.log('开始', i)
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(i)
            console.log('结束', i)
        }, i)
    )
}

asyncPool(2, [5000, 4000, 3000, 2000], timeout).then(res => {
    console.log(res)
})
```
