
##  绘制上下文 
```js
  <canvas
    id="canvas"
    width="500" 
    height="500" 
    style="box-shadow: 0px 0px 5px #ccc; border-radius: 8px;">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    console.log(ctx) // CanvasRenderingContext2D ...
  </script>
```

1. contextType
    - `2d` 2D绘制上下文
    - `webgl` 3D渲染上下文对象  只支持在实现WebGL版本1的浏览器上可用也就是 OpenGL ES 2.0。
    - `webgl2` 3D渲染上下文对象  只支持在实现WebGL版本2的浏览器上可用也就是 OpenGL ES 3.0。
    - `bitmaprenderer` 用于创建一个只提供将 canvas 内容替换为指定 ImageBitmap 功能的ImageBitmapRenderingContext。
  
2. contextAttributes
    - 2d 
       - `alpha` 它的值为Boolean类型，如果设置为false, 浏览器将认Canvas背景总是不透明的，这样可以做到一些性能提效。
       - `willReadFrequently` 值也为Boolean类型，用于表明是否要重复操作，频繁调用getImageData()方法时能节省内存，但是仅Gecko内核浏览器支持。
       - `storage` 用于表明使用哪种方式存储，默认值 persisten，表示持久化存储。

    - 3d(webgl,webgl2)
       - `alpha` 值为Boolean类型，指示画布是否包含alpha缓冲区。
       - `antialias` 值为Boolean类型，指示是否开启抗锯齿。
       - `depth` 值为Boolean类型，表示绘图缓冲区的深度缓冲区至少为16位。
       - `failIfMajorPerformanceCaveat` 值为Boolean类型，指示如果系统性能较低，是否创建上下文。
       - `powerPreference` 对用户代理的提示，指示GPU的哪种配置适合WebGL上下文。可能的值是：
          - default: 自动选择模式，自动决定哪种GPU配置最合适，为默认值。
          - high-performance: 高性能模式，优先考虑渲染性能而不是功耗。
          - low-power: 节能模式，优先考虑节能而不是渲染性能。
       - `premultipliedAlpha` 值为Boolean类型，表示页面合成器将假定绘图缓冲区包含具有预乘alpha的颜色。
       - `preserveDrawingBuffer` 值为Boolean类型，如果值为true，则不会清除缓冲区并保留其值，直到被清除或被使用者覆盖。 
       - `stencil` 值为Boolean类型，表示绘图缓冲区具有至少8位的模板缓冲区。


## 绘制方式
- 描边 `stroke()`  描边样式 `strokeStyle`
- 填充 `fill()` 填充样式 `fillStyle`
- `strokeStyle` 和 `fillStyle` 属性的设置是一次设置永久有效的，想要改变必须重新设置其他值来覆盖原有的值。
- 直线
  - moveTo(x, y) 设置初始位置，参数为初始位置x和y的坐标点
  - lineTo(x, y) 设置指定位置，参数为指定位置x和y的坐标点
  - lineWidth 设置直线的粗细，默认值为1，且属性值必须为正数。
  - lineCap 设置直线端点显示的样式。可选值为：butt，round 和 square。默认是 butt。
  - lineJoin 设置两线段连接处所显示的样子。可选值为：round, bevel(平) 和 miter(尖)。默认是 miter。
- 矩形
  - rect(x, y, width, height)  矩形描边  需要搭配 stroke() 或 fill()绘制图形
  - strokeRect(x, y, width, height)  绘制矩形 
  - fillRect(x, y, width, height) 填充矩形
- 圆弧和圆
  - ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    - x，y 为圆弧中心或圆的圆心坐标、
    - radius 为圆弧的半径或圆的半径、
    - startAngle 为圆弧或圆的起始点，从x轴方向开始计算，且单位为弧度、
    - endAngle 为圆弧或圆的终点，单位也是为弧度
    - anticlockwise 是一个可选参数，可选值为Boolean类型，用它来表示圆弧或圆的绘制方向，默认为false，顺时针绘制圆弧或圆。
  - 角度转弧度的公式为：弧度 = 角度 * Math.PI / 180
- 椭圆
  - ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    - x、y：椭圆的圆心坐标
    - radiusX：x轴的半径大小
    - radiusY：y轴的半径大小
    - rotation：椭圆的旋转角度，也是以弧度表示
    - startAngle：开始绘制点
    - endAngle：结束绘制点
    - anticlockwise：可选参数，表示绘制的方向（默认顺时针）。
- 圆角矩形(Chrome 99+)
  - ctx.roundRect(x,y,width,height,radii)
  - 圆角radii有以下几种取值
    - all-corners ，只有 1 一个值的时候，表示所有 4 个圆角
    - [all-corners]，也可以是数组，当只有 1 一个值的时候，也表示 4 个圆角
    - [top-left-and-bottom-right, top-right-and-bottom-left]，数组为 2 个值的时候，表示左上、右下圆角 和 右上、左下圆角
    - [top-left, top-right-and-bottom-left, bottom-right]，数组为 3 个值的时候，表示左上圆角、右上、左下圆角 和 右下圆角
    - [top-left, top-right, bottom-right, bottom-left]，数组为 4 个值的时候，表示左上圆角、右上圆角 、 右下圆角和左下圆角
- 文本
  - ctx.strokeText(txt, x, y, maxWidth) 文本描边
  - ctx.fillText(txt, x, y, maxWidth) 文本填充
    - txt：是绘制的文本内容
    - x、y：为绘制文本的起始位置坐标
    - maxWidth：可选参数，为文本绘制的最大宽度。文案大于最大宽度时不是裁剪或者换行，而是缩小。
  - ctx.font = "30px Arial" 设置字体样式 默认 10px sans-serif
  - textAlign 文本对齐的方式。默认值是 start，可选值有：left、right、center、start和end。
  - direction属性可以设置文本的方向。默认值是 inherit， 可选值为：ltr（文本方向从左向右）、rtl（文本方向从右向左）、inherit（根据情况继承 Canvas元素或者 Document ）。
  - textBaseline属性设置基于基线对齐的文字垂直方向的对齐方式。默认值是alphabetic，可选值为：top、hanging、middle、alphabetic、ideographic和bottom。
  - 文字阴影
    - shadowOffsetX属性用于设置阴影在 X轴 上的延伸距离，默认值为0，如设置为10，则表示延 X轴 向右延伸10像素的阴影，也可以为负值，负值表示阴影会往反方向（向左）延伸。
    - shadowOffsetY属性用于设置阴影在 Y轴 上的延伸距离，默认值为0，如设置为10，则表示延 Y轴 向下延伸10像素的阴影，也可以为负值，负值表示阴影会往反方向（向上）延伸。
    - shadowBlur属性用于设置阴影的模糊程度，默认为 0。
    - shadowColor属性用于设置阴影的颜色，默认为全透明的黑色。
- 图像
  - drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    - image：绘制的元素（图像）。
    - sx、sy：裁剪框左上角的坐标。
    - sWidth、sHeight：裁剪框的宽度和高度。
    - dx、dy：绘制元素（图像）时左上角的坐标。
    - dWidth、dHeight：绘制元素（图像）的宽度和高度。如果不设置，则在绘制时image宽度和高度不会缩放。

## 动画
- 移动 translate(x, y)
- 旋转 rotate(angle) 以弧度为单位，顺时针旋转
- 缩放 scale(x, y)
- 状态的保存和恢复 save() 和 restore()
    - 应用的变形：移动、旋转、缩放、strokeStyle、fillStyle、globalAlpha、lineWidth、lineCap、lineJoin、miterLimit、lineDashOffset、shadowOffsetX、shadowOffsetY、shadowBlur、shadowColor、globalCompositeOperation、font、textAlign、textBaseline、direction、imageSmoothingEnabled等。
    - 应用的裁切路径（clipping path）
- transform 实现移动、旋转和缩放，还能实现斜切。
    - transform(a, b, c, d, e, f)
        a：水平缩放，不缩放为1
        b：水平倾斜，不倾斜为0
        c：垂直倾斜，不倾斜为0
        d：垂直缩放，不缩放为1
        e：水平移动，不移动为0
        f：垂直移动，不移动为0
        因此不设置参数的时候，默认参数为transform(1, 0, 0, 1, 0, 0)

## [canvas应用](https://juejin.cn/post/7171828391346176007)
    

