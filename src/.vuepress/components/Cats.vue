<template>
    <div class="img-container">
        <img v-for="(item, index) in list" :src="item" :key="index" alt="item" loading="lazy" class="img-item" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
// 预览插件
let list = Object.values((import.meta as any).glob('../public/images/cats/*.*', { eager: true })).map(
    (v: any) => v.default
)
// let state: any = null
</script>

<style lang="scss">
.img-container {
    .img-item {
        width: 45%;
        height: 200px;
        cursor: pointer;
        margin: 4px;
        border-radius: 10px;
        object-fit: cover;
    }
}
</style>
