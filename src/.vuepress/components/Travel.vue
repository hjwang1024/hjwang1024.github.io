<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import photo from './travel-photo.js'
import { createPhotoSwipe } from '@vuepress/plugin-photo-swipe/client'
let list = photo
list = []

let a = Object.values(import.meta.glob('../public/images/*.*', { eager: true })).map((v: any) => v.default)
console.log(a)
list = a

let state = null

const openPhotoSwipe = (index: number) => {
    state?.open(index - 1)
}

onMounted(async () => {
    // 通过图片链接创建一个新的 photoswipe 实例
    state = await createPhotoSwipe(list, {
        // photoswipe 选项
    })
})

onUnmounted(() => {
    state?.destroy()
})
</script>

<template>
    <div>
        <img
            v-for="(item, index) in list"
            :src="item"
            :key="item"
            @click="openPhotoSwipe(index)"
            alt="item"
            class="img-item"
        />
    </div>
</template>

<style lang="scss">
.img-item {
    width: 48%;
}
</style>
