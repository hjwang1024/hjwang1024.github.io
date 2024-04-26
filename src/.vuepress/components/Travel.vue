<template>
    <div class="img-container">
        <img
            v-for="(item, index) in list"
            :data-src="item"
            src="/images/travel-background.jpeg"
            :key="index"
            @click="openPhotoSwipe(index)"
            alt="item"
            loading="lazy"
            class="img-item"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
// 预览插件
import { createPhotoSwipe } from '@vuepress/plugin-photo-swipe/client'
// let list = Object.values((import.meta as any).glob('./assets/images/travel/*.*', { eager: true })).map(
let list = Object.values((import.meta as any).glob('../public/images/travel/*.*', { eager: true })).map(
    (v: any) => v.default
)
let state: any = null

const openPhotoSwipe = (index: number) => {
    console.log(index)
}

onMounted(async () => {
    // 通过图片链接创建一个新的 photoswipe 实例
    state = await createPhotoSwipe(list, {
        // photoswipe 选项
    })
    const option = {
        root: null, //所监听对象的具体祖先元素。如果未传入值或值为null，则默认使用顶级文档的视窗。
        rootMargin: '20px 0px', //预先加载的距离
        threshold: [0], // 特定的相交比例
    }
    const images = document.querySelectorAll('.img-item')
    const intersectionObserver = new IntersectionObserver(callback, option)
    function callback(entries) {
        entries.forEach(item => {
            if (item.isIntersecting) {
                item.target.src = item.target.dataset.src // 开始加载图片,把data-origin的值放到src
                intersectionObserver.unobserve(item.target) // 停止监听已开始加载的图片
            }
        })
    }
    images.forEach(item => intersectionObserver.observe(item))
})

onUnmounted(() => {
    state?.destroy()
})
</script>

<style lang="scss">
.img-container {
    .img-item {
        width: 45%;
        height: 200px;
        cursor: pointer;
        padding: 4px;
        border-radius: 10px;
        object-fit: cover;
    }
}
</style>
