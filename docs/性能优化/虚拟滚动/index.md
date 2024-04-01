# listScroll
使用 IntersectionObserver + pedding 实现

![无限下拉示意图](https://p1.music.126.net/pJ_RZghrsOLO2UK8hlN6Pw==/109951164458290045.gif)

## 缺陷
- 快速滑动滚动条，无法监听到
- 原因
    - 执行阶段位于事件循环 "Update the rendering" 步骤的的子步骤中。
![1](./images/1.WEBP)
![2](./images/2.WEBP)
![3](./images/3.WEBP)
    - 交叉监视器的异步执行基于 event-loop，处于 动画帧回调函数requestAnimationFrame 之后，又在 requestidlecallback 之前。
    - 大部分设备中浏览器的刷新频率为 60FPS ，大概是 16.6ms 一次，也就是说如果我们拖动滚动条的速度快于这个更新频率 IntersectionObserver 确实是有可能不会执行到的

