<template>
    <div class="img-container">
        <img
            v-for="(item, index) in list"
            :src="item"
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
import { createPhotoSwipe } from '@vuepress/plugin-photo-swipe/client'
let list = Object.values((import.meta as any).glob('./assets/images/travel/*.*', { eager: true })).map(
    // let list = Object.values((import.meta as any).glob('../public/images/travel/*.*', { eager: true })).map(
    (v: any) => v.default
)

let state: any = null

const openPhotoSwipe = (index: number) => {
    console.log(index)

    // state?.open(index)
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
