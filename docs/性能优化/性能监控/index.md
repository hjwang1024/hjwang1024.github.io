# 监控

## 性能指标

-   白屏（FP）

    -   首次非网页背景像素渲染（fp）(白屏时间)

    ```js
    new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntriesByName('first-paint')) {
            console.log('fp', entry)
        }
    }).observe({ type: 'paint', buffered: true }) // buffered 使用初始化之前发生的性能缓冲数据
    ```

-   灰屏时间（fcp）

    -   首次绘制**任何**文本、图像、非空白 canvas 或者 SVG 的时间点（fcp）
    -   首次内容渲染时 0 长

    ```js
    new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
            console.log('fcp', entry)
        }
    }).observe({ type: 'paint', buffered: true })
    // entryTypes: ["mark", "measure", "paint"] 可以监听多种类型 不能和type，buffered一起使用
    ```

-   首次有效绘制（FMP）（首屏）

    ```js
    new MutationObserver((records: Array<MutationRecord>) => {
        // 对当前的 document 进行计算评分
        // 或者对 records.addedNodes的每个 node 元素，计算评分累加;每次遍历元素还需要判断此元素是否在可视区域
    }).observe(document, { childList: true, subtree: true })
    ```

-   最大内容绘制（LCP）

    -   LCP 是页面内首次开始加载的时间点，到 可视区域内最大的图像或者文本块完成渲染 的 相对时间，是一个以用户为中心的性能指标，可以测试用户主观感知到的页面加载速度，因为最大内容绘制完成时，往往可以认为 页面将要加载完成
    -   最好控制在 2.5s 内

    ```js
    new PerformanceObserver(entryList => {
        const entries = entryList.getEntries()
        const entry = entries[entries.length - 1]
        console.log('lcp', entry)
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    ```

-   首次输入延迟（FID）

    -   FID 是从用户第一次与页面交互（例如当他们单击链接、点按按钮或使用由 JavaScript 驱动的自定义控件）直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间。
    -   最好控制在 100ms 内

    ```js
    new PerformanceObserver(entryList => {
        const entries = entryList.getEntries()
        const entry = entries[entries.length - 1]
        const delay = entry.processingStart - entry.startTime
        console.log('FID:', delay, entry)
    }).observe({ type: 'first-input', buffered: true })
    ```

-   累计布局偏移（CLS）

    -   CLS 是测量整个页面生命周期（页面可见性变成隐藏）内发生的所有 意外布局偏移 中最大一的 布局偏移分数。；每当一个已渲染的可见元素的位置从一个可见位置变更到下一个可见位置时，就发生了 布局偏移。CLS 会衡量在网页的整个生命周期内发生的所有意外布局偏移的得分总和。
    -   控制在 0.1 以内

    ```js
    let clsValue = 0
    let clsEntries = []
    let sessionValue = 0
    let sessionEntries = []
    new PerformanceObserver(entryList => {
        for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
                const firstSessionEntry = sessionEntries[0]
                const lastSessionEntry = sessionEntries[sessionEntries.length - 1]
                if (
                    sessionValue &&
                    entry.startTime - lastSessionEntry.startTime < 1000 &&
                    entry.startTime - firstSessionEntry.startTime < 5000
                ) {
                    sessionValue += entry.value
                    sessionEntries.push(entry)
                } else {
                    sessionValue = entry.value
                    sessionEntries = [entry]
                }
                if (sessionValue > clsValue) {
                    clsValue = sessionValue
                    clsEntries = sessionEntries
                    console.log('CLS:', clsValue, clsEntries)
                }
            }
        }
    }).observe({ type: 'layout-shift', buffered: true })
    ```

-   其他技术指标

    -   关键时间点
        <table><thead><tr><th>字段</th><th>描述</th><th>计算公式</th><th>备注</th></tr></thead><tbody><tr><td>FP</td><td>白屏时间</td><td>responseEnd - fetchStart</td><td>从请求开始到浏览器开始解析第一批 HTML 文档字节的时间。</td></tr><tr><td>TTI</td><td>首次可交互时间</td><td>domInteractive - fetchStart</td><td>浏览器完成所有 HTML 解析并且完成 DOM 构建，此时浏览器开始加载资源。</td></tr><tr><td>DomReady</td><td>HTML 加载完成时间也就是 DOM Ready 时间。</td><td>domContentLoadEventEnd - fetchStart</td><td>单页面客户端渲染下，为生成模板 dom 树所花费时间；非单页面或单页面服务端渲染下，为生成实际 dom 树所花费时间'</td></tr><tr><td>Load</td><td>页面完全加载时间</td><td>loadEventStart - fetchStart</td><td>Load=首次渲染时间+DOM 解析耗时+同步 JS 执行+资源加载耗时。</td></tr><tr><td>FirstByte</td><td>首包时间</td><td>responseStart - domainLookupStart</td><td>从 DNS 解析到响应返回给浏览器第一个字节的时间</td></tr></tbody></table> - 关键时间段
        <table><thead><tr><th>字段</th><th>描述</th><th>计算公式</th><th>备注</th></tr></thead><tbody><tr><td>DNS</td><td>DNS 查询耗时</td><td>domainLookupEnd - domainLookupStart</td><td>如果使用长连接或本地缓存，则数值为 0</td></tr><tr><td>TCP</td><td>TCP 连接耗时</td><td>connectEnd - connectStart</td><td>如果使用长连接或本地缓存，则数值为 0</td></tr><tr><td>SSL</td><td>SSL 安全连接耗时</td><td>connectEnd - secureConnectionStart</td><td>只在 HTTPS 下有效，判断 secureConnectionStart 的值是否大于 0,如果为 0，转为减 connectEnd</td></tr><tr><td>TTFB</td><td>请求响应耗时</td><td>responseStart - requestStart</td><td>TTFB 有多种计算方式，相减的参数可以是 requestStart 或者 startTime</td></tr><tr><td>Trans</td><td>内容传输耗时</td><td>responseEnd - responseStart</td><td>无</td></tr><tr><td>DOM</td><td>DOM 解析耗时</td><td>domInteractive - responseEnd</td><td>无</td></tr><tr><td>Res</td><td>资源加载耗时</td><td>loadEventStart - domContentLoadedEventEnd</td><td>表示页面中的同步加载资源。</td></tr></tbody></table>

        -   计算指标

            ```typescript
            export interface MPerformanceNavigationTiming {
                FP?: number
                TTI?: number
                DomReady?: number
                Load?: number
                FirstByte?: number
                DNS?: number
                TCP?: number
                SSL?: number
                TTFB?: number
                Trans?: number
                DomParse?: number
                Res?: number
            }

            // 获取 NT
            const getNavigationTiming = (): MPerformanceNavigationTiming | undefined => {
                const resolveNavigationTiming = (entry: PerformanceNavigationTiming): MPerformanceNavigationTiming => {
                    const {
                        domainLookupStart,
                        domainLookupEnd,
                        connectStart,
                        connectEnd,
                        secureConnectionStart,
                        requestStart,
                        responseStart,
                        responseEnd,
                        domInteractive,
                        domContentLoadedEventEnd,
                        loadEventStart,
                        fetchStart,
                    } = entry

                    return {
                        // 关键时间点
                        FP: responseEnd - fetchStart,
                        TTI: domInteractive - fetchStart,
                        DomReady: domContentLoadedEventEnd - fetchStart,
                        Load: loadEventStart - fetchStart,
                        FirstByte: responseStart - domainLookupStart,
                        // 关键时间段
                        DNS: domainLookupEnd - domainLookupStart,
                        TCP: connectEnd - connectStart,
                        SSL: secureConnectionStart ? connectEnd - secureConnectionStart : 0,
                        TTFB: responseStart - requestStart,
                        Trans: responseEnd - responseStart,
                        DomParse: domInteractive - responseEnd,
                        Res: loadEventStart - domContentLoadedEventEnd,
                    }
                }

                const navigation =
                    performance.getEntriesByType('navigation').length > 0
                        ? performance.getEntriesByType('navigation')[0]
                        : performance.timing // W3C Level1 (目前兼容性高，仍然可使用，未来可能被废弃)。
                return resolveNavigationTiming(navigation as PerformanceNavigationTiming)
            }

            // 初始化 NT 的获取以及返回
            initNavigationTiming = (): void => {
                const navigationTiming = getNavigationTiming()
                const metrics = navigationTiming as IMetrics
                this.metrics.set(metricsName.NT, metrics)
            }
            ```

        -   静态资源时间

            ```js
            const resource = performance.getEntriesByType('resource')

            const formatResourceArray = resource.map(item => {
                return {
                    name: item.name, //资源地址
                    startTime: item.startTime, //开始时间
                    responseEnd: item.responseEnd, //结束时间
                    time: item.duration, //消耗时间
                    initiatorType: item.initiatorType, //资源类型
                    transferSize: item.transferSize, //传输大小
                    //请求响应耗时 ttfb = item.responseStart - item.startTime
                    //内容下载耗时 tran = item.responseEnd - item.responseStart
                    //但是受到跨域资源影响。除非资源设置允许获取 timing
                }
            })
            ```

        -   缓存资源命中率

        ```js
        const resource = performance.getEntriesByType('resource')
        let cacheQuantity = 0
        const formatResourceArray = resource.map(item => {
            if (item.duration == 0 && item.transferSize !== 0) cacheQuantity++
            return {
                name: item.name, //资源地址
                startTime: item.startTime, //开始时间
                responseEnd: item.responseEnd, //结束时间
                time: item.duration, //消耗时间
                initiatorType: item.initiatorType, //资源类型
                transferSize: item.transferSize, //传输大小
                //请求响应耗时 ttfb = item.responseStart - item.startTime
                //内容下载耗时 tran = item.responseEnd - item.responseStart
                //但是受到跨域资源影响。除非资源设置允许获取timing
            }
        })
        console.log('缓存命中率', (cacheQuantity / resource.length).toFixed(2))
        ```

## 错误数据采集

-   资源加载错误
-   js 执行错误
-   promise 错误

```js
const errors = []
function collectError() {
    // 资源加载错误数据采集
    addEventListener(
        'error',
        e => {
            const target = e.target
            if (target != window) {
                errors.push({
                    type: target.localName,
                    url: target.src || target.href,
                    msg: (target.src || target.href) + ' is load error',
                    time: new Date().getTime(), // 错误发生的时间
                })
            }
        },
        true
    )
    // 监听js错误
    window.onerror = function (msg, url, row, col, error) {
        errors.push({
            type: 'javascript',
            row: row,
            col: col,
            msg: error && error.stack ? error.stack : msg,
            url: url,
            time: new Date().getTime(), // 错误发生的时间
        })
    }
    // 监听 promise 错误 缺点是获取不到行数数据
    addEventListener('unhandledrejection', e => {
        errors.push({
            type: 'promise',
            msg: (e.reason && e.reason.msg) || e.reason || '',
            time: new Date().getTime(), // 错误发生的时间
        })
    })
}
collectError()
```

## 数据上报

-   window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。利用浏览器空闲函数可以做页面性能的采集和上报，这样不影响页面的正常性能。当然，这个功能不是所有浏览器都支持，需要做兼容判断。

```js
const monitor = {
    // 前端监控
    performance: null, // 性能
    resources: [], // 资源
    errors: [], // 错误
}
window.onload = function () {
    if (window.requestIdleCallback) {
        // 如果浏览器支持这个方法，利用这个方法采集页面性能数据
        window.requestIdleCallback(() => {
            monitor.performance = getPerformance()
            monitor.resources = getResources()
            uploadMonitor()
        })
    } else {
        setTimeout(function () {
            monitor.performance = getPerformance()
            monitor.resources = getResources()
            uploadMonitor()
        }, 0)
    }
}
function uploadMonitor() {
    // 上报前端监控的性能数据+资源数据
    axios.post('/xxxx', {
        performance: monitor.performance,
        resources: monitor.resources,
    })
    // 上报成功的话，可以把数据 monitor.performance 和 monitor.resources 清一下
}
```

-   错误上报
    -   用一个数组收集所有错误，再统一在某个阶段上报（延时上报）
    -   在错误发生时上报（即时上报）。这样可以避免“收集完错误，但延时上报还没触发，用户却已经关掉网页导致错误数据丢失”的问题。
    -   可以使用 navigator.sendBeacon() 来进行上报。（推荐）
