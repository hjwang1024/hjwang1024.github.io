# HTML&CSS

## BFC

### bfc 的效果

让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响

-   1.BFC 内部的盒子会在垂直方向上一个接一个排列（bfc 里面也有正常的文档流）
-   2.解决外边距重叠
-   3.BFC 容器在计算高度的时候，会连浮动元素计算在内

### 创建 bfc

-   浮动 float:left / right 可以将容器变为 BFC
-   定位 position: absolute / fixed 可以将容器变为 BFC
-   行内块 display: inline-block
-   表格单元 diaplay:table-cell，只要元素为 table- ... 的形式都可以
-   overflow:auto / hidden / overlay / scroll
-   弹性盒子 (display:flex/inline-flex)

### BFC 容器 的范围

一个 BFC 包含该上下文的子元素，但不包含创建了新 BFC 的子元素的内部元素, 即:A>B>C>D ,当 A 为 BFC 容器，A 能包含 B C D ，但是当 C 为 BFC 容器时 A 就不能作用到 D 容器，那么就是说一个元素不能同时存在在两个 BFC 里面
