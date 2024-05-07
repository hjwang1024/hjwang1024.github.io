# Vue 基础知识

## Vue2 迁移 Vue3

### 实例化 Vue 及全局属性

-   vue2 使用`new Vue()`实例化,Vue3 使用`createApp()`实例化
-   Vue2 全局属性挂载在`Vue.prototype.$xxx = xxx`, Vue3 全局属性挂载在`app.config.globalProperties`

### v-model

-   2.x 默认的 props 是 value 3.x 默认为 modelValue
-   2.x emit 派发 input 3.x 默认为 update:modelValue
-   3.x 废除了 sync 修饰符 和 native 修饰符

```js
  <template>
   <!--废弃-->
   <div xxx.sync></div>
   <A @click.native></A>
   <!--新增多v-model用法以及自定义修饰符-->
   <B v-model:xxx='a' v-model:cccc='a' v-model:ddd.yyy.ccc='a'></B>
  </template>
  export default {
   props: {
     modelValue: String // 以前是`value：String`
   },
   emits: ['update:modelValue'],
   methods: {
     changePageTitle(title) {
       this.$emit('update:modelValue', title) // 以前是 `this.$emit('input', title)`
     }
   }
 }

```

### v-for 和 v-if 指令优先级调整

-   2.x 版本中在一个元素上同时使用 v-if 和 v-for 时，v-for 会优先作用

-   3.x 版本中 v-if 总是优先于 v-for 生效。

### 异步组件

-   2.x 异步组件直接通过 promise 返回
-   3.x 异步组件需要通过 defineAsyncComponent 包裹返回

```js
//2.x
const asyncModal = () => import('./Modal.vue')

//3.x
import { defineAsyncComponent } from 'vue'
const asyncModal = defineAsyncComponent(() => import('./Modal.vue'))
```

### 部分名字改变

-   destroyed 生命周期选项被重命名为 unmounted

-   beforeDestroy 生命周期选项被重命名为 beforeUnmount

-   transition 组件部分 class 重命名
    -   leave-class  已经被重命名为  leave-from-class (在渲染函数中可以写 leaveFromClass)
    -   enter-class  已经被重命名为  enter-from-class (在渲染函数中可以写 enterFromClass)
-   .v-enter 字符串实例替换为 .v-enter-from

-   .v-leave 字符串实例替换为 .v-leave-from

### 自定义指令

```js
2.x
bind - 指令绑定到元素后调用。只调用一次。
inserted - 元素插入父 DOM 后调用。
update - 当元素更新，但子元素尚未更新时，将调用此钩子。
componentUpdated - 一旦组件和子级被更新，就会调用这个钩子。
unbind - 一旦指令被移除，就会调用这个钩子。也只调用一次。

3.x
created - 新增！在元素的 attribute 或事件监听器被应用之前调用。
bind → beforeMount
inserted → mounted
beforeUpdate：新增！在元素本身被更新之前调用，与组件的生命周期钩子十分相似。
update → 移除！该钩子与 updated 有太多相似之处，因此它是多余的。请改用 updated。
componentUpdated → updated
beforeUnmount：新增！与组件的生命周期钩子类似，它将在元素被卸载之前调用。
unbind -> unmounted


```

### 移除的 API

-   $on，$off 和 $once 实例方法已被移除，组件实例不再实现事件触发接口。 2.x 会使用这两个方法进行 eventBus 封装，在 Vue3 中移除了，使用 mitt 库代替。
-   filters 过滤器移除，在 vue3 中可以使用方法代替
-   $children 移除，在 2.x 使用 $children 访问子组件实例，Vue3 推荐使用模板引用也就是 ref 访问子组件
-   全局函数 set 和 delete 以及实例方法 $set 和 $delete。基于代理的变化检测已经不再需要它们了
-   按键修饰符，在 Vue3 已经废除， Vue 3 继续支持这一点就不再有意义了。因此，现在建议对任何要用作修饰符的键使用 kebab-cased (短横线) 名称

```js
<!-- Vue 3 在 v-on 上使用按键修饰符 -->
<input v-on:keyup.page-down="nextPage">

<!-- 同时匹配 q 和 Q -->
<input v-on:keypress.q="quit">

```

### 新增的 API

-   Vue3.2 新增的内置指令`v-memo`，大致的作用就是小幅度手动提升一部分性能
-   当搭配 v-for 使用 v-memo，确保两者都绑定在同一个元素上。`v-memo 不能用在 v-for 内部。`
-   如果 v-memo="[]" 传入的是一个空数组，那么他的效果和 v-once 一样
