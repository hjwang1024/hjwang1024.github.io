# ElementUI

## el-select 多选 回显超长

```css
.el-select__tags-text {
    display: inline-block;
    max-width: 70px; // 根据实际情况调整
    overflow: hidden; // 溢出隐藏
    text-overflow: ellipsis; // 超出文本以省略号显示
    white-space: nowrap; // 文本不换行
}

.el-tag__close.el-icon-close {
    top: -7px; // 清除下标的位置调整
}
```
